// given raw neomem text, output json

const fs = require('fs')
// const path = require('path')

// const s = fs.readFileSync(path.resolve(__dirname, '../../assets/rules.neomem'), 'utf-8')
const s = fs.readFileSync(0).toString()


const lines = s.split('\n')

// const states = {}

let state = 0

// lines.forEach(line => {
//   console.log(line)
// })

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lineType = getLineType(line)
  console.log(line, lineType)
}


// get type of line based on regexp and current state
function getLineType(line, state) {
  const lineType = line.match(/foo/)
  console.log(lineType)
}



