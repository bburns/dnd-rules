import React from 'react';
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import 'sanitize.css'
// import remarkGridTables from 'remark-grid-tables'

import rules from '../../assets/rules2.json'
import './styles.css'
import './print.css'
import dragon from '../../assets/dragon-192x192x256.png'


function idize(s) {
  return s.replace(/ /g, '-').toLowerCase()
}

// eg groupBy(rules, 'parentId')
function groupBy(arr, key) {
  const d = {}
  arr.forEach(el => {
    const keyValue = el[key] || 'none' // eg parentId = 'basic'
    d[keyValue] = d[keyValue] || []
    d[keyValue].push(el) // add element to a list for each parentId
  })
  const ret = []
  for (let keyValue of Object.keys(d)) {
    const group = { [key]: keyValue, values: d[keyValue] }
    ret.push(group)
  }
  return ret
}

// using https://github.com/remarkjs/remark-react
function markdownToReact(md) {
  return (
    <div id="preview">
      {
        unified()
          .use(parse) // remark-parse
          // .use(remarkGridTables)
          .use(remark2react)
          .processSync(md).contents
      }
    </div>
  )
}


const dndRules = rules.filter(rule => !!rule.dnd) // ie just include dnd rules
// const rulesByLevel = groupBy(dndRules, 'level')
const rulesByLevel = groupBy(dndRules, 'parentId')
console.log(rulesByLevel)
const levelNames = {
  0: "Basic",
  1: "Intermediate",
  2: "Advanced",
  3: "Optional",
}


function Header() {
  return (
    <div className="app-header" role="banner">
      <h1 className="h1">
        <img src={dragon} alt=""/>
        Dungeons &amp; Dragons Rules
      </h1>
    </div>
  )
}

function Footer() {
  return (
    <div className="app-footer">
      Dragon icon by <a href="http://clipart-library.com/clipart/8cxKqA59i.htm">Zeila on Clipart library</a>
    </div>
  )
}


function TableOfContents({ rulesByLevel }) {
  return (
    <div className="toc">
      {/* <div className="toc-title">Table of Contents</div> */}
      {rulesByLevel.map(level => (
        <div className="toc-level">
          <a className="toc-level-title" key={level.id} href={"#" + level.id}>
            {/* Level {level.level} */}
            {/* {levelNames[level.level]} */}
            {level.name}
          </a>
          <div className="toc-rules">
            {level.values.map(rule => (
              <a className="toc-rule" key={rule.id} href={"#" + rule.id}>
                {rule.name}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}


function Rules({ rulesByLevel }) {
  return (
    <div className="app-rules">
      {rulesByLevel.map(level => <Level key={level.id} level={level} />)}
    </div>
  )
}


function Level({ level }) {
  return (
    <div className="app-rules-section">
      <h2>
        {/* {levelNames[level.level]} */}
        {level.name}
      </h2>
      <div className="body rule-list">
        {level.values.map(rule => <Rule key={rule.id} rule={rule} />)}
      </div>
    </div>
  )
}


function Rule({ rule }) {
  return (
    <div key={rule.name} id={rule.id} className="rule">
      <h3>{rule.name}</h3>
      {(rule.contents || rule.dnd) && 
        <div className="rule-body">
          {markdownToReact(rule.contents)}
          <div className="rule-reference">{rule.dnd}</div>
        </div>
      }
    </div>
  )
}


export default function() {
  // const [rules, setRules] = React.useState([])
  // React.useEffect(async () => {
  //   const data = await axios.get(url)
  // }, [])

  return (
    <div className="app">
      <Header />
      <div className="app-contents">
        <TableOfContents rulesByLevel={rulesByLevel} />
        <div className="app-page">
          <Rules rulesByLevel={rulesByLevel} />
          <Footer />
        </div>
      </div>
    </div>
  );
}
