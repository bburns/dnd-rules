import React from 'react';
import logo from './logo.svg';
import './App.css';
import rules from './assets/rules.json'
import './assets/f1.css'
import './assets/f4.css'
import './assets/f5.css'
import './assets/style.css'

function App() {
  // const [rules, setRules] = React.useState([])
  // React.useEffect(async () => {
  //   const data = await axios.get(url)
  // }, [])
  return (
    <div className="app">
      <div className="body-area">
        <header class="main-heading -center" role="banner">
          <h1 class="h1">D&amp;D Rules <em>Cheatsheet</em></h1>
        </header>
        <main className="post-content MarkdownBody-wrapified">
          <div className="h2-sect">
            <div className="body h3-section-list">
              {rules.map(rule => (
                <div className="h3-section">
                  <h3>{rule.Topic}</h3>
                  {rule.Notes && <div className="body">
                    {rule.Notes}
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
