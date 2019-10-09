import React from 'react';
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import { arrayToTree } from 'performant-array-to-tree'
import 'normalize.css'
// import remarkGridTables from 'remark-grid-tables'
import dragon from '../../assets/images/dragon-192x192x256.png'
import items from '../../assets/rules.json'
import TableOfContents from '../toc'
import './styles.css'
import './print.css'

// this only does horizontal layout (alpha order gets out of synch)
// import Masonry from 'react-masonry-css' // see https://github.com/paulcollett/react-masonry-css

// this works but not for print view
// import Masonry from 'masonry-layout' // see https://masonry.desandro.com

// this works for screen and print view
import 'colcade'


// make tree of groups and rules
// lib fn requires parentId fields
// see https://github.com/philipstanislaus/performant-array-to-tree
for (let item of items) {
  item.complexity = item.complexity || null
  item.phase = item.phase || null
}


export default function () {
  const [groupBy, setGroupBy] = React.useState("complexity") // or "phase"
  const items2 = items.filter(item => item.type===groupBy || item.type==="rule")
  const groups = arrayToTree(items2, { parentId: groupBy, dataField: null })
  console.log(groups)
  const groupsExtended = [{id:'introduction', name:"Introduction"}, ...groups, {id:'about', name: "About"}]
  return (
    <div className="app">
      <Header />
      <div className="app-contents">
        <div className="sidebar">
          {/* <Controls groupBy={groupBy} setGroupBy={setGroupBy} /> */}
          <TableOfContents groups={groupsExtended} />
        </div>
        <div className="app-page">
          <Introduction/>
          <Groups groups={groups} />
          <About />
          <Links />
        </div>
      </div>
    </div>
  )
}


function Header() {
  return (
    <div className="header">
      <img src={dragon} alt="" />
      <h1 className="h1">Dungeons &amp; Dragons Rules</h1>
    </div>
  )
}


function Controls({ groupBy, setGroupBy }) {
  function onChange(evt) {
    const newGroupBy = evt.target.value
    setGroupBy(newGroupBy)
  }
  return (
    <div className="controls">
      Group By
      <select name="groupBy" id="groupBy" onChange={onChange}>
        <option value="complexity">Complexity</option>
        <option value="phase">Phase</option>
      </select>
    </div>
  )
}


function Introduction() {
  return (
    <div className="introduction" id="introduction">
      <h2>Introduction</h2>
      <p>This is an unofficial listing of the D&amp;D (5th edition) rules, split into three sections - Basic, Intermediate, and Advanced. You can start by playing with the Basic rules and add more as needed.</p>
      <p>For sources used and how to contribute see <a href="#about">About</a> section.</p>
    </div>
  )
}


function Groups({ groups }) {
  return (
    <div className="groups">
      {groups.map(group => <Group key={group.id} group={group} />)}
    </div>
  )
}


function Group({ group }) {
  return (
    <div className="group" id={group.id}>
      <h2>
        {group.name}
      </h2>
      <div className="group-contents">
        {markdownToReact(group.contents)}
      </div>
      <div className="rule-list" data-colcade="columns: .rule-col, items: .rule">
        <div className="rule-col rule-col--1"></div>
        <div className="rule-col rule-col--2"></div>
        <div className="rule-col rule-col--3"></div>
        {group.children && group.children.map(rule => <Rule key={rule.id} rule={rule} />)}
      </div>
    </div>
  )
}


function Rule({ rule }) {
  return (
    <div key={rule.name} id={rule.id} className="rule">
      <h3>{rule.name}</h3>
      {(rule.contents || rule.ref) &&
        <div className="rule-body">
          {markdownToReact(rule.contents)}
          <div className="rule-reference">{rule.ref}</div>
          {/* <div className="rule-reference">{rule.phase}</div> */}
          {/* <div className="rule-reference">{rule.complexity}</div> */}
        </div>
      }
    </div>
  )
}


function About() {
  return (
    <div className="about" id="about">
      <h2>About</h2>
      <p>Sources used are the Player's Handbook 5th Edition, with references to page numbers in the book given as e.g. "ph152" for page 152 - and the <a href="https://www.dndbeyond.com/sources/basic-rules">System Reference Document (SRD) rules online</a>.</p>
      <p>Dragon icon by <a href="http://clipart-library.com/clipart/8cxKqA59i.htm">Zeila on Clipart library</a></p>
      <p>Dungeons &amp; Dragons, D&amp;D, their respective logos, and all Wizards titles and characters are property of <a href="https://dnd.wizards.com/">Wizards of the Coast</a> LLC in the U.S.A. and other countries. ©2019 Wizards.</p>
    </div>
  )
}

function Links() {
  return (
    <div className="links">
      {/* essentials kit */}
      <span className="links-link">
        <a href="https://www.amazon.com/gp/product/0786966831/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0786966831&linkCode=as2&tag=bburnskm-20&linkId=2bb4f26c9206c6e67677e23ee43beda1">
          <img border="0" alt="" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0786966831&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=bburnskm-20" />
        </a>
        <img src="//ir-na.amazon-adsystem.com/e/ir?t=bburnskm-20&l=am2&o=1&a=0786966831" width="1" height="1" border="0" alt="" />
      </span>
      {/* players handbook */}
      <span className="links-link">
        <a href="https://www.amazon.com/gp/product/0786965606/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0786965606&linkCode=as2&tag=bburnskm-20&linkId=16ab017f0aad078aec7e89b26b250b2e"><img border="0" alt="" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0786965606&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=bburnskm-20" /></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=bburnskm-20&l=am2&o=1&a=0786965606" width="1" height="1" border="0" alt="" />
      </span>
      {/* dungeon masters guide */}
      <span className="links-link">
        <a href="https://www.amazon.com/gp/product/0786965622/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0786965622&linkCode=as2&tag=bburnskm-20&linkId=94784984c15f4e262bea5208b318d655"><img border="0" alt="" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0786965622&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=bburnskm-20" /></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=bburnskm-20&l=am2&o=1&a=0786965622" width="1" height="1" border="0" alt="" />
      </span>
      <div className="links-disclaimer">Note: As an Amazon Associate I earn from qualifying purchases.</div>
    </div>
  )
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
