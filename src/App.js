import React from 'react';
// import logo from './logo.svg';
import './App.css';
import rules from './assets/rules.json'
import './css/devhints1.css'
import './css/devhints2.css'
import './css/devhints3.css'
import './css/devhints4.css'

import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'


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
    // ret[keyValue] = d[keyValue]
    ret.push(group)
  }
  return ret
}


const rulesByLevel = groupBy(rules, 'Level')
console.log(rulesByLevel);


// unified()
//   .use(markdown)
//   .use(remark2rehype)
//   .use(html)

function markdownToReact(md) {
  return (
    <div id="preview">
      {
        unified()
          .use(parse)
          .use(remark2react)
          .processSync(md).contents
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
      <div className="toc">
        {rulesByLevel.map(level => (
          <div className="toc-level">
            <div className="toc-level">Level {level.Level}</div>
            {level.values.map(rule => (
              <div key={rule.Topic} className="toc-rule">{rule.Topic}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="body-area">
        <header className="main-heading -center" role="banner">
          <h1 className="h1">D&amp;D Rules <em>Cheatsheet</em></h1>
        </header>
        <main className="post-content MarkdownBody-wrapified">
          <div className="h2-sect">
            <div className="body h3-section-list">
              {rules.map(rule => (
                <div key={rule.Topic} className="h3-section">
                  <h3>{rule.Topic}</h3>
                  {rule.Notes && <div className="body">
                    {markdownToReact(rule.Notes)}
                  </div>}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
