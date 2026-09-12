const button = document.querySelector("#gravity");
const elements = [...document.querySelectorAll("header > img, header > h1, .summary > li, nav")];
const { Bodies, Composite, Engine, Events, Runner } = Matter;

let simulation;

async function listenForOrientation(engine) {
  try {
    const OrientationEvent = window.DeviceOrientationEvent;

    if (typeof OrientationEvent?.requestPermission === "function") {
      const permission = await OrientationEvent.requestPermission();
      if (permission !== "granted") return;
    }

    const listener = ({ beta, gamma }) => {
      if (beta === null || gamma === null) return;

      engine.gravity.x = Math.sin((gamma * Math.PI) / 180);
      engine.gravity.y = Math.sin((beta * Math.PI) / 180);
    };

    window.addEventListener("deviceorientation", listener);
    return listener;
  } catch {
    // The downward default still works when sensor access is unavailable.
  }
}

function createWalls() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const thickness = 100;
  const options = { isStatic: true };

  return [
    Bodies.rectangle(width / 2, -thickness / 2, width + thickness * 2, thickness, options),
    Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, options),
    Bodies.rectangle(-thickness / 2, height / 2, thickness, height + thickness * 2, options),
    Bodies.rectangle(width + thickness / 2, height / 2, thickness, height + thickness * 2, options),
  ];
}

async function start() {
  const engine = Engine.create();
  const runner = Runner.create();
  const rectangles = elements.map((element) => element.getBoundingClientRect());
  const bodies = rectangles.map((rect) =>
    Bodies.rectangle(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height, {
      restitution: 0.82,
      friction: 0.08,
      frictionAir: 0.008,
      angle: (Math.random() - 0.5) * 0.08,
    }),
  );

  elements.forEach((element, index) => {
    const rect = rectangles[index];
    Object.assign(element.style, {
      position: "fixed",
      left: "0",
      top: "0",
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      margin: "0",
      zIndex: "2",
    });
  });

  const render = () => {
    bodies.forEach((body, index) => {
      const rect = rectangles[index];
      const x = body.position.x - rect.width / 2;
      const y = body.position.y - rect.height / 2;
      elements[index].style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
    });
  };

  Composite.add(engine.world, [...createWalls(), ...bodies]);
  Events.on(engine, "afterUpdate", render);
  Runner.run(runner, engine);

  simulation = {
    engine,
    runner,
    render,
    orientationListener: await listenForOrientation(engine),
  };
}

function stop() {
  const { engine, runner, render, orientationListener } = simulation;

  Runner.stop(runner);
  Events.off(engine, "afterUpdate", render);
  Engine.clear(engine);
  if (orientationListener) window.removeEventListener("deviceorientation", orientationListener);
  elements.forEach((element) => element.removeAttribute("style"));
  simulation = undefined;
}

button.addEventListener("click", async () => {
  if (simulation) {
    stop();
    button.textContent = "Disable gravity";
  } else {
    await start();
    button.textContent = "Restore gravity";
  }
});
