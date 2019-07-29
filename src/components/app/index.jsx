import React from 'react';
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import 'normalize.css'
// import remarkGridTables from 'remark-grid-tables'
import dragon from '../../assets/images/dragon-192x192x256.png'
import rules from '../../assets/rules.json'
import TableOfContents from '../toc'
import * as lib from '../../lib'
import './styles.css'
import './print.css'


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
          <div className="app-intro">
            <h2>Introduction</h2>
            <div>
              The rules are split here into 3 sections - Basic, Intermediate, and Advanced. The Basic rules are the minimum needed to play a game - others can be added as desired.
            </div>
            <br />
            <div>
              The core mechanic of Dungeons and Dragons is to roll a 20 sided die (d20), add relevant modifiers, and compare to a target number to determine success or failure.
            </div>
          </div>
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
      <img src={dragon} alt=""/>
      <h1 className="h1">Dungeons &amp; Dragons Rules</h1>
    </div>
  )
}

function Footer() {
  return (
    <div className="app-footer">
      <span>Rules (c) Wizards of the Coast</span>
      <span>Dragon icon by <a href="http://clipart-library.com/clipart/8cxKqA59i.htm">Zeila on Clipart library</a></span>
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
          {markdownToReact(rule.contents)}
          <div className="rule-reference">{rule.dnd}</div>
        </div>
      }
    </div>
  )
}
