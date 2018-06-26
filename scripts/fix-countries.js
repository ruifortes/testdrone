const fs = require('fs')

var countries = require('./countries.json')

var newData = countries.map(val => {
  return {_key: val.cca3, ...val}
})

fs.writeFileSync('countries-fix.json', JSON.stringify(newData , null, "\t"))
