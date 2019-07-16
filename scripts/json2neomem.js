// read json, spit out as formatted neomem text
//. initially this will also translate csvjson format to tree structure

const fs = require('fs-extra')

const groupBy = 'level'
const groupNames = ['Basic', 'Intermediate', 'Advanced']

const rules = fs.readJsonSync('./src/assets/rules.json')
const line = '---------------------------------------------------------------------------'

let groupValue = undefined
for (let rule of rules) {
  if (rule[groupBy] !== groupValue) {
    groupValue = rule[groupBy]
    const groupName = groupNames[groupValue]
    console.log(line)
    console.log('# ' + groupName + ' #')
    console.log(line)  
    console.log()
  }
  console.log(line)
  console.log('## ' + rule.name + ' ##')
  console.log(line)
  console.log()
  console.log(rule.description)
  console.log()
  if (rule.dnd) console.log('dnd: ' + rule.dnd)
  if (rule.aime) console.log('aime: ' + rule.aime)
  if (rule.type) console.log('subtype: ' + rule.type)
  if (rule.urls) console.log('urls: ' + rule.urls)
  console.log()
  console.log()
}
