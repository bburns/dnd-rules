import React from 'react';
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import 'sanitize.css'
// import remarkGridTables from 'remark-grid-tables'

import rules from '../../assets/rules.json'
import './devhints.css'
import './styles.css'
import './print.css'
import dragon from '../../assets/dragon-192x192x256.png'


function idize(s) {
  return s.replace(/ /g, '-').toLowerCase()
}

function groupBy(arr, key) {
  const d = {}
  arr.forEach(el => {
    const keyValue = el[key]
    d[keyValue] = d[keyValue] || []
    d[keyValue].push(el)
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
          .use(parse)
          // .use(remarkGridTables)
          .use(remark2react)
          .processSync(md).contents
      }
    </div>
  )
}


const dndRules = rules.filter(rule => !!rule.dnd) // ie just include dnd rules
const rulesByLevel = groupBy(dndRules, 'level')

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
          <a className="toc-level-title" key={level.level} href={"#" + level.level}>
            {/* Level {level.level} */}
            {levelNames[level.level]}
          </a>
          <div className="toc-rules">
            {level.values.map(rule => (
              <a className="toc-rule" key={rule.name} href={"#" + idize(rule.name)}>
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
      {rulesByLevel.map(level => <Level key={level.name} level={level} />)}
    </div>
  )
}


function Level({ level }) {
  return (
    <div>
      <h2 className="body-level">
        {/* Level {level.level} */}
        {levelNames[level.level]}
      </h2>
      <div className="body rule-list">
        {level.values.map(rule => <Rule key={rule.name} rule={rule} />)}
      </div>
    </div>
  )
}


function Rule({ rule }) {
  return (
    <div key={rule.name} id={idize(rule.name)} className="rule">
      <h3>{rule.name}</h3>
      {(rule.description || rule.dnd) && 
        <div className="body">
          {markdownToReact(rule.description)}
          <div className="rule-dnd">{rule.dnd}</div>
        </div>
      }
    </div>
  )
}


function App() {
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

export default App;
