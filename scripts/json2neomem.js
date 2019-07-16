// read json, spit out as formatted neomem text
//. initially this will also translate csvjson format to tree structure

const fs = require('fs-extra')

// const packageObj = fs.readJsonSync('./package.json')
// console.log(packageObj.version) 

const rules = fs.readJsonSync('./src/assets/rules.json')
const line = '---------------------------------------------------------------------------'

for (let rule of rules) {
  // console.log(rule)
  console.log(line)
  console.log(rule.name)
  console.log(line)

}
