// given raw neomem text, output json

const fs = require('fs')
// const path = require('path')

// const s = fs.readFileSync(path.resolve(__dirname, '../../assets/rules.neomem'), 'utf-8')
const s = fs.readFileSync(0).toString()

const lines = s.split('\n')

const regexps = {
  dashes: /^----+$/,
  prop: /(.+):(.+)/,
}

let state = 'start'
let obj = createObj()
const objs = []
const idsByDepth = {}
let depth = 0

for (let i = 0; i < lines.length; i++) {

  const line = lines[i]
  const linetype = getLineType(line)
  // console.log(linetype, ': ', line)

  if (state === 'start') {
    if (linetype === 'dashes') {
      state = 'startHeader'
    }

  } else if (state === 'startHeader') {
    if (linetype === 'text') {
      state = 'exitHeader'
      // obj.name = line //. strip #'s
      // let name = line.trim()
      const match = line.match(/(#*)[ ]*([^#]+)[ ]*#*/) // eg "### some name ###"
      const hashes = match[1]
      depth = hashes.length
      // console.log(hashes, depth)
      obj.name = match[2]
    }

  } else if (state === 'exitHeader') {
    if (linetype === 'dashes') {
      state = 'inContents'
    }

  } else if (state === 'inContents') {
    if (linetype === 'dashes') {
      state = 'startHeader'
      obj = finishObject(obj)
      objs.push(obj)
      obj = createObj()
    } else if (linetype === 'prop') {
      const match = line.match(/([^ ]+):[ ]*(.+)/) // eg "weight: 15lbs"
      const prop = match[1]
      const value = match[2]
      obj[prop] = value
    } else {
      obj.contents += line + '\n'
    }
  }

}

// handle eof
obj = finishObject(obj)
objs.push(obj)

console.log(objs)

function finishObject(obj) {
  // finish object
  if (!obj.id) obj.id = encodeURI(obj.name.replace(/ /g, '-').toLowerCase())
  idsByDepth[depth] = obj.id
  if (depth > 0) obj.parentId = idsByDepth[depth - 1]
  return obj
}

// function esc(s) {
//   encodeURI
// }

// get type of line based on regexp and current state
function getLineType(line, state) {
  let linetype = 'text'
  if (regexps.dashes.test(line)) {
    linetype = 'dashes'
  } else if (regexps.prop.test(line)) {
    linetype = 'prop'
    //. also use regexp to split? or just use split(':') - simplest for now
    // const match = line.match(/(.+):(.+)/)
    // const prop = match[1]
    // const value = match[2]
  }
  return linetype
}


function createObj() {
  const obj = {}
  obj.name = ''
  obj.contents = ''
  return obj
}


