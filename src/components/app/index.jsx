import React from 'react';
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import 'sanitize.css'

import rules from '../../assets/rules.json'
import './devhints.css'
import './styles.css';


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


const rulesByLevel = groupBy(rules, 'Level')


// using https://github.com/remarkjs/remark-react
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
              <div key={rule.Topic} className="toc-rule">
                <a href={"#" + idize(rule.Topic)}>
                  {rule.Topic}
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="body-area">
        <header className="main-heading -center" role="banner">
          <h1 className="h1">D&amp;D Rules <em>Cheatsheet</em></h1>
        </header>
        <main className="post-content MarkdownBody-wrapified">
          {rulesByLevel.map(level => (
            <div className="h2-sect">
              <h2 className="body-level">Level {level.Level}</h2>
              <div className="body h3-section-list">
                {level.values.map(rule => (
                  <div key={rule.Topic} id={idize(rule.Topic)} className="h3-section">
                    <h3>{rule.Topic}</h3>
                    {rule.Notes && <div className="body">
                      {markdownToReact(rule.Notes)}
                    </div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
      </div>
      );
    }
    
    export default App;
