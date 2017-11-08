let fs = require('fs')
let currentData = require('./list.json')
let list = fs.readFileSync('./list').toString().split('\n')
// console.log(currentData)
// console.log(list)
for (var i = 0; i < list.length; i++) {
  if (!currentData.includes(list[i]) && list[i] !== '') {
    currentData.push(list[i])
  }
}
fs.writeFileSync('./list.json', JSON.stringify(currentData, null, 2))
