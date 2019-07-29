import React from 'react';
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import 'normalize.css'
// import remarkGridTables from 'remark-grid-tables'
import dragon from '../../assets/images/dragon-192x192x256.png'
import rules from '../../assets/rules.json'
import * as lib from '../../lib'
import './styles.css'
import './print.css'


// function idize(s) {
//   return s.replace(/ /g, '-').toLowerCase()
// }


// just include headers and dnd rules
const dndRules = rules.filter(rule => (!rule.parentId) || (!!rule.dnd))

const rulesByLevel = lib.groupBy(dndRules, 'parentId').filter(level => level.parentId!=='none')
console.log(rulesByLevel)



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

// convert neomem text contents to markdown, as needed
// esp internal links
function linkifyText(nm) {
  let md = nm
  // [Something nice] --> [Something nice](#something-nice)
  md = md.replace(/\[([^|]+?)\]/g, (match, p1) => {
    return `[${p1}](#${getIdFromName(p1)})`
  })
  // [Something|Somethings] --> [Something](#something "Somethings")
  md = md.replace(/\[(.+?)\|(.+?)\]/g, (match, p1, p2) => {
    return `[${p1}](#${getIdFromName(p1)} "${p2}")`
  })
  return md
}

// keep in synch with neomem's version
function getIdFromName(s) {
  return encodeURI(s.replace(/ /g, '-').toLowerCase())
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
  )
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
        <div className="toc-level" key={level.id}>
          <a className="toc-level-title" href={"#" + level.id}>
            {level.name}
          </a>
          <div className="toc-rules">
            {level.values && level.values.map(rule => (
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
    <div className="app-rules-section" id={level.id}>
      <h2>
        {level.name}
      </h2>
      <div className="body rule-list">
        {level.values && level.values.map(rule => <Rule key={rule.id} rule={rule} />)}
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
          {markdownToReact(linkifyText(rule.contents))}
          <div className="rule-reference">{rule.dnd}</div>
        </div>
      }
    </div>
  )
}
