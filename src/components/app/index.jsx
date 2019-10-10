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
  const groupsExtended = [{id:'introduction', name:"Introduction"}, ...groups, {id:'about', name:"About"}, {id:'license', name:"License"}]
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
          <License />
        </div>
      </div>
    </div>
  )
}


function Header() {
  return (
    <div className="header">
      <img src={dragon} alt="" />
      {/* <h1 className="h1">Dungeons &amp; Dragons Rules</h1> */}
      <h1 className="h1">System Reference Document 5 Rules</h1>
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
      <p>This is an unofficial listing of Wizards of the Coast's System Reference Document 5 game rules, split into three sections - Basic, Intermediate, and Advanced. You could start by playing with the Basic rules and add more as needed.</p>
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
      <p>Sources used are the <a href="https://www.dndbeyond.com/sources/basic-rules">System Reference Document (SRD5) rules online</a>. Additional references are given for the Dungeons &amp; Dragons Player's Handbook 5th Edition, e.g. "ph152" for page 152.</p>
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


function License() {
  return (
    <div className="license" id="license">
      <h2>License</h2>
      <div className="license-contents">

OPEN GAME LICENSE Version 1.0a

The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc ("Wizards"). All Rights Reserved.

1. Definitions: (a) "Contributors" means the copyright and/or trademark owners who have contributed Open Game Content; (b) "Derivative Material" means copyrighted material including derivative works and translations (including into other computer languages), potation, modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other form in which an existing work may be recast, transformed or adapted; (c) "Distribute" means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or otherwise distribute; (d) "Open Game Content" means the game mechanic and includes the methods, procedures, processes and routines to the extent such content does not embody the Product Identity and is an enhancement over the prior art and any additional content clearly identified as Open Game Content by the Contributor, and means any work covered by this License, including translations and derivative works under copyright law, but specifically excludes Product Identity. (e) "Product Identity" means product and product line names, logos and identifying marks including trade dress; artifacts; creatures characters; stories, storylines, plots, thematic elements, dialogue, incidents, language, artwork, symbols, designs, depictions, likenesses, formats, poses, concepts, themes and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells, enchantments, personalities, teams, personas, likenesses and special abilities; places, locations, environments, creatures, equipment, magical or supernatural abilities or effects, logos, symbols, or graphic designs; and any other trademark or registered trademark clearly identified as Product identity by the owner of the Product Identity, and which specifically excludes the Open Game Content; (f) "Trademark" means the logos, names, mark, sign, motto, designs that are used by a Contributor to identify itself or its products or the associated products contributed to the Open Game License by the Contributor (g) "Use", "Used" or "Using" means to use, Distribute, copy, edit, format, modify, translate and otherwise create Derivative Material of Open Game Content. (h) "You" or "Your" means the licensee in terms of this agreement.

2. The License: This License applies to any Open Game Content that contains a notice indicating that the Open Game Content may only be Used under and in terms of this License. You must affix such a notice to any Open Game Content that you Use. No terms may be added to or subtracted from this License except as described by the License itself. No other terms or conditions may be applied to any Open Game Content distributed using this License.

3. Offer and Acceptance: By Using the Open Game Content You indicate Your acceptance of the terms of this License.

4. Grant and Consideration: In consideration for agreeing to use this License, the Contributors grant You a perpetual, worldwide, royalty-free, non-exclusive license with the exact terms of this License to Use, the Open Game Content.

5. Representation of Authority to Contribute: If You are contributing original material as Open Game Content, You represent that Your Contributions are Your original creation and/or You have sufficient rights to grant the rights conveyed by this License.

6. Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include the exact text of the COPYRIGHT NOTICE of any Open Game Content You are copying, modifying or distributing, and You must add the title, the copyright date, and the copyright holder's name to the COPYRIGHT NOTICE of any original Open Game Content you Distribute.

7. Use of Product Identity: You agree not to Use any Product Identity, including as an indication as to compatibility, except as expressly licensed in another, independent Agreement with the owner of each element of that Product Identity. You agree not to indicate compatibility or co-adaptability with any Trademark or Registered Trademark in conjunction with a work containing Open Game Content except as expressly licensed in another, independent Agreement with the owner of such Trademark or Registered Trademark. The use of any Product Identity in Open Game Content does not constitute a challenge to the ownership of that Product Identity. The owner of any Product Identity used in Open Game Content shall retain all rights, title and interest in and to that Product Identity.

8. Identification: If you distribute Open Game Content You must clearly indicate which portions of the work that you are distributing are Open Game Content.

9. Updating the License: Wizards or its designated Agents may publish updated versions of this License. You may use any authorized version of this License to copy, modify and distribute any Open Game Content originally distributed under any version of this License.

10. Copy of this License: You MUST include a copy of this License with every copy of the Open Game Content You Distribute.

11. Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any Contributor unless You have written permission from the Contributor to do so.

12. Inability to Comply: If it is impossible for You to comply with any of the terms of this License with respect to some or all of the Open Game Content due to statute, judicial order, or governmental regulation then You may not Use any Open Game Material so affected.

13. Termination: This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days of becoming aware of the breach. All sublicenses shall survive the termination of this License.

14. Reformation: If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable.

15. COPYRIGHT NOTICE

Open Game License v 1.0 Copyright 2000, Wizards of the Coast, Inc.

System Reference Document 5.1 Copyright 2016, Wizards of the Coast, Inc.

Authors Mike Mearls, Jeremy Crawford, Chris Perkins, Rodney Thompson, Peter Lee, James Wyatt, Robert J. Schwalb, Bruce R. Cordell, Chris Sims, and Steve Townshend, based on original material by E. Gary Gygax and Dave Arneson.

END OF LICENSE
      </div>
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
