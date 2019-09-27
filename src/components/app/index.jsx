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
          <Introduction />
          <Footer />
          <Rules rulesByLevel={rulesByLevel} />
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
      <span>Dungeons &amp; Dragons, D&amp;D, their respective logos, and all Wizards titles and characters are property of Wizards of the Coast LLC in the U.S.A. and other countries. ©2019 Wizards. </span>
      <span>Dragon icon by <a href="http://clipart-library.com/clipart/8cxKqA59i.htm">Zeila on Clipart library</a></span>
    </div>
  )
}


function Introduction() {
  return (
    <div className="app-intro">
    <h2>Introduction</h2>
    <div>
      This is an unofficial summary of the D&amp;D (5th edition) rules, split into three sections - Basic, Intermediate, and Advanced. You can start by playing with the Basic rules and add more as needed. 
    </div>
    <br/>
    <div>
      The core mechanic of Dungeons and Dragons is to roll a 20 sided die (d20), add relevant modifiers, and compare to a target number to determine success or failure.
    </div>
    <br/>
    <div>
      {/* (<a href="https://www.dndbeyond.com/marketplace/source/players-handbook">dndbeyond.com</a>, <a href="https://www.amazon.com/Players-Handbook-Dungeons-Dragons-Wizards/dp/0786965606/ref=sr_1_15">Amazon.com</a>)  */}
      Sources used are the <a href="https://www.amazon.com/Players-Handbook-Dungeons-Dragons-Wizards/dp/0786965606/ref=sr_1_15">Player's Handbook 5th Edition</a>, with references to page numbers in the book given as e.g. ph152 - and the <a href="https://www.dndbeyond.com/sources/basic-rules">System Reference Document (SRD) rules online</a>.
    </div>
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
