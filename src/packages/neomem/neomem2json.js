// given raw neomem text, output json

const fs = require('fs')
// const path = require('path')

// const s = fs.readFileSync(path.resolve(__dirname, '../../assets/rules.neomem'), 'utf-8')
const s = fs.readFileSync(0).toString()
// console.log(s)

const lines = s.split('\n')
// console.log(lines)

// const states = {}


// lines.forEach(line => {
//   console.log(line)
// })

const regexps = {
  dashes: /----+/,
}

let state = 'start'
let obj = {}

const objs = []
for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const linetype = getLineType(line)
  console.log(line, linetype)
  if (state === 'start') {
    if (linetype === 'dashes') {
      state = 'inheader'
    }
  } else if (state === 'inheader') {
    if (linetype === 'text') {
      state = 'outheader'
      obj.name = line //. strip #'s
    }
  } else if (state === 'outheader') {
    if (linetype === 'dashes') {
      state = 'incontents'
    }
  } else if (state === 'incontents') {
    if (linetype === 'dashes') {
      state = 'inheader'
      console.log(obj)
      obj = {}
    } else {
      obj.contents += line + '\n'
    }
  }
}


// get type of line based on regexp and current state
function getLineType(line, state) {
  let linetype = 'text'
  if (regexps.dashes.test(line)) {
    linetype = 'dashes'
  }
  return linetype
}



