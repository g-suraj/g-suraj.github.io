let fs = require('fs')
let path = require('path')
let cPath = path.join(__dirname, '/raw/')
let files = fs.readdirSync(cPath)
let reviews = []
files.map((file) => {
  if (file[0] !== '.') {
    let data = fs.readFileSync(cPath + file).toString().split('\n')
    reviews.push(data)
  }
})
reviews.sort((a, b) => {
  return b[4].split('-').join('') - a[4].split('-').join('')
})
fs.writeFileSync(path.join(__dirname, '/reviews.json'), JSON.stringify(reviews, null, 2))
