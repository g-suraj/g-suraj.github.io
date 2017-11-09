let fs = require('fs')
let currentData = require('./list.json')
let list = fs.readFileSync('./list').toString().split('\n')
let album
let artist

let replaceAll = function (str, search, replacement) {
  return str.split(search).join(replacement)
}

for (var i = 0; i < list.length; i++) {
  if (list[i] !== '') {
    let deets = list[i].split('/')
    artist = deets[deets.length - 3]
    artist = replaceAll(artist, '_', ' ')
    artist = replaceAll(artist, '-', ' ')
    album = deets[deets.length - 2]
    album = replaceAll(album, '_', ' ')
    album = replaceAll(album, '-', ' ')
  }
  let logged = false
  for (let i = 0; i < currentData.length; i++) {
    if (JSON.stringify(currentData[i]) == JSON.stringify([artist, album, list[i]])) {
      logged = true
      break
    }
  }
  if (!logged) {
    currentData.push([artist, album, list[i]])
  }
}
fs.writeFileSync('./list.json', JSON.stringify(currentData, null, 2))
