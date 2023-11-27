
const fs = require('fs');
let text = fs.readFileSync('data.js', 'utf8');
const data = require('data');
let DB = data.finesData;
console.log(DB)
//console.log(text)