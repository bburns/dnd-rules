// given raw neomem text, output json
const fs = require('fs')
const path = require('path')


const s = fs.readFileSync(path.resolve(__dirname, '../../assets/rules.neomem'), 'utf-8')
console.log(s)

const lines = s.split('\n')



