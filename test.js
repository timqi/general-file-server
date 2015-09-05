var fs = require('fs')

var stats = fs.statSync('./____statics/logo.png')

console.log(stats.isFile())
