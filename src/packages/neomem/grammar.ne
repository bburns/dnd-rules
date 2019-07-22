# neomem grammar
# parse with nearley
# converts neomem text to json string


@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace
# char -> 


# ----------------------------------------------------
# main
# ----------------------------------------------------
main -> block:* {% d=>`[${d.join(', ')}]` %}


# ----------------------------------------------------
# block
# ----------------------------------------------------
# block -> _ dashes name dashes props contents {% d=>`{${d[2]}, ${d[4]}, ${d[5]}}` %}
# block -> _ dashes name dashes contents props {% d=>`{${d[2]}, ${d[4]}, ${d[5]}}` %}
block -> _ dashes name dashes contents {% d=>`{${d[2]}, ${d[4]}}` %}


# ----------------------------------------------------
# dashes
# ----------------------------------------------------
dashes -> "----" "-":* "\n"   {% d=>null %}


# ----------------------------------------------------
# name
# ----------------------------------------------------
name -> [#a-zA-Z0-9'.,!@&(): ]:+ "\n"   {% d => `"name":"${d[0].join('')}"` %}


# ----------------------------------------------------
# contents
# ----------------------------------------------------
# contents -> (. | [\n]):* line  {% d => `"description": "${d[0].join('').trim()}"` %}
# contents -> (.:* [\n]):* dashes

# paragraph -> .:* [\n]   {% null %}
# contents -> paragraph:* dashes

char -> . | [\n]
contents -> char:* "----"

{% 
  function(d) {
    const value = d[0]
    return `"description": "${d[0].join('').trim()}"` 
  }
%}


# ----------------------------------------------------
# props
# ----------------------------------------------------
# props -> prop:* {% d=>d[0].join(', ') %}

props -> prop:*

{%
  function(d) {
    const props = d[0] // list of 0 or more prop json strings
    return props.join(', ')
  }
%}


# ----------------------------------------------------
# prop
# ----------------------------------------------------
# prop -> [^:]:+ [:] .:+ "\n"  {% d => `"${d[0].join('').trim()}":"${d[2].join('').trim()}"` %}

prop -> [^:]:+  [:]  .:+ [\n]

{%
  function(d) {
    const name = d[0].join('').trim()
    const value = d[2].join('').trim()
    return `"${name}": "${value}"`
  }
%}

