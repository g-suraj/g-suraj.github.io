let lower;
let data;
let upper;
let length;
let keys = [];

let reset_bounds = function() {
    lower = 0
    upper = Math.min(keys.length, 5)
}

let load = function() {
    var appendage = ''
    for (var i = lower; i < upper; ++i) {
        let key = keys[i]
        let curr = data[key]
        let append = '\
        <li class="reviewEntry row ">\
          <div class="details col-md-4 ">\
              <div class="image ">\
                  <a href=" ' + curr[0] + ' ">\
          <img src=" ' + curr[1] + ' ">\
        </a>\
              </div>\
              <div class="artistAlbum ">\
                  <div class="album ">' + curr[2] + '</div>\
                  <div class="artist ">' + curr[3] + '</div>\
                  <div class="date ">' + curr[4] + '</div>\
              </div>\
          </div>\
          <div class="review col-md-8 ">\
              <div class="text ">' + curr[5] + '</div>\
              <div class="forFansOf ">For Fans of: ' + curr[6] + '</div>\
              <div class="favTracks ">Favourite Tracks: ' + curr[7] + '</div>\
              <div class="score ">' + curr[8] + '</div>\
          </div>\
      </li>'
        appendage += append
    }
    $("ul ").empty();
    $("ul ").append(appendage);
}

let left = function() {
    if (lower !== 0) {
        lower -= 5;
        if (upper % 5 === 0) {
            upper -= 5
        } else {
            upper -= (upper % 5)
        }
        load()
    }
}

let right = function() {
    if (upper !== keys.length) {
        lower = lower + 5
        upper = Math.min(upper + 5, keys.length)
        load()
    }
}

let filter = function(str) {
  str = (str.trim()).toUpperCase();

  if (!str.length) {
    keys = Object.keys(data)
  } else {
    new_keys = []

    //2, 3, 4
    for(let i = 0; i < Object.keys(data).length; ++i)
    {
      key = Object.keys(data)[i];
      idx = (data[key][2].toUpperCase()).indexOf(str)
          + (data[key][3].toUpperCase()).indexOf(str)
          + (data[key][4].toUpperCase()).indexOf(str)

      if(idx > -3)
      {
        new_keys.push(key);
      }

    }

    keys = new_keys
  }

  reset_bounds()
  load();
}
