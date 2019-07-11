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
      <header className="app-header" role="banner">
        <h1 className="h1">Dungeons &amp; Dragons Rules</h1>
      </header>
      <div className="app-contents">
        <div className="toc">
          {rulesByLevel.map(level => (
            <div className="toc-level">
              <a className="toc-level-title" key={level.Level} href={"#" + level.Level}>Level {level.Level}</a>
              <div className="toc-rules">
                {level.values.map(rule => (
                  <a className="toc-rule" key={rule.Topic} href={"#" + idize(rule.Topic)}>
                    {rule.Topic}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="app-rules">
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
        </div>
      </div>
    </div>
  );
}

export default App;
