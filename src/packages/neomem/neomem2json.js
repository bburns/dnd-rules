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
  prop: /(.+):(.+)/,
}

let state = 'start'
let obj = createObj()

const objs = []

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const linetype = getLineType(line)
  console.log(line, linetype)

  if (state === 'start') {
    if (linetype === 'dashes') {
      state = 'startHeader'
    }

  } else if (state === 'startHeader') {
    if (linetype === 'text') {
      state = 'exitHeader'
      obj.name = line //. strip #'s
    }

  } else if (state === 'exitHeader') {
    if (linetype === 'dashes') {
      state = 'startContents'
    }

  } else if (state === 'startContents') {
    if (linetype === 'dashes') {
      state = 'startHeader'
      objs.push(obj)
      obj = createObj()
    } else {
      obj.contents += line + '\n'
    }
  }

}

// handle eof
objs.push(obj)

console.log(objs)


// get type of line based on regexp and current state
function getLineType(line, state) {
  let linetype = 'text'
  if (regexps.dashes.test(line)) {
    linetype = 'dashes'
  } else if (regexps.prop.test(line)) {
    linetype = 'prop'
    //. also use regexp to split? or just use split(':') - simplest for now
  }
  return linetype
}


function createObj() {
  const obj = {}
  obj.name = ''
  obj.contents = ''
  return obj  
}


