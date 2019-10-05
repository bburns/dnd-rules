import React from 'react'
import './styles.css'


export default function({ levels }) {
  return (
    <div className="toc">
      {/* <div className="toc-title">Table of Contents</div> */}
      {levels.map(level => (
        <div className="toc-level" key={level.id}>
          <a className="toc-level-title" href={"#" + level.id}>
            {level.name}
          </a>
          <div className="toc-rules">
            {level.children && level.children.map(rule => (
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
