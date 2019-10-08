import React from 'react'
import './styles.css'


export default function({ groups }) {
  return (
    <div className="toc">
      {/* <div className="toc-title">Table of Contents</div> */}
      {groups.map(group => (
        <div className="toc-group" key={group.id}>
          <a className="toc-group-title" href={"#" + group.id}>
            {group.name}
          </a>
          <div className="toc-rules">
            {group.children && group.children.map(rule => (
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
