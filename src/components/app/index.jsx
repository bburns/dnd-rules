import React from 'react';
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import { arrayToTree } from 'performant-array-to-tree'
import 'normalize.css'
// import remarkGridTables from 'remark-grid-tables'
import dragon from '../../assets/images/dragon-192x192x256.png'
import rules from '../../assets/rules.json'
import TableOfContents from '../toc'
import './styles.css'
import './print.css'


// make tree of levels and rules
// lib fn requires parentId fields
// see https://github.com/philipstanislaus/performant-array-to-tree
for (let rule of rules) {
  rule.parentId = rule.parentId || null
}
const levels = arrayToTree(rules, {dataField:null})
console.log(levels)



export default function() {
  return (
    <div className="app">
      <Header />
      <div className="app-contents">
        <TableOfContents levels={levels} />
        <div className="app-page">
          <Levels levels={levels} />
          <Links />
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


function Links() {
  return (
    <div className="links">
      <span className="links-link">
        <a target="_blank" href="https://www.amazon.com/gp/product/0786966831/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0786966831&linkCode=as2&tag=bburnskm-20&linkId=2bb4f26c9206c6e67677e23ee43beda1">
          <img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0786966831&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=bburnskm-20" />
        </a>
        <img src="//ir-na.amazon-adsystem.com/e/ir?t=bburnskm-20&l=am2&o=1&a=0786966831" width="1" height="1" border="0" alt="" />
      </span>
      <div className="links-disclaimer">Note: As an Amazon Associate I earn from qualifying purchases.</div>
    </div>
  )
}


function Levels({ levels }) {
  return (
    <div className="app-rules">
      {levels.map(level => <Level key={level.id} level={level} />)}
    </div>
  )
}


function Level({ level }) {
  return (
    <div className="app-rules-section" id={level.id}>
      <h2>
        {level.name}
      </h2>
      <div className="level-contents">
        {markdownToReact(level.contents)}
      </div>
      <div className="body rule-list">
        {level.children && level.children.map(rule => <Rule key={rule.id} rule={rule} />)}
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
