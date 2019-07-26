# neomem grammar
# parse with nearley
# converts neomem text to json string

@{%

const moo = require('moo')

let lexer = moo.compile({
    //space: {match: /\s+/, lineBreaks: true},
    //true: 'true',
    //false: 'false',
    //null: 'null',
    line: { match: /----*\n/ },
    words: { match: /[^]+/, lineBreaks: true },
})

%}

@lexer lexer


@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace
# char -> 


# ----------------------------------------------------
# main
# ----------------------------------------------------
main -> block:* {% d=>`[${d.join(', ')}]` %}


# ----------------------------------------------------
# block
# ----------------------------------------------------
# block -> _ line name line props contents {% d=>`{${d[2]}, ${d[4]}, ${d[5]}}` %}
# block -> _ line name line contents props {% d=>`{${d[2]}, ${d[4]}, ${d[5]}}` %}
# block -> _ line name line contents {% d=>`{${d[2]}, ${d[4]}}` %}
block -> _ %line name %line contents {% d=>`{${d[2]}, ${d[4]}}` %}


# ----------------------------------------------------
# line
# ----------------------------------------------------
# line -> "----" "-":* [\n]   {% d=>null %}
line -> %line {% d=>null %}


# ----------------------------------------------------
# name
# ----------------------------------------------------
# will want to somehow convert the leading ##'s to indentation level / parentId etc

# name -> [#a-zA-Z0-9'.,!@&(): ]:+ "\n"   {% d => `"name":"${d[0].join('')}"` %}
# name -> [#a-zA-Z0-9'.,!@&(): ]:+ "\n"   

name -> .:+ [\n]

{% 
  d => `"name":"${d[0].join('')}"` 
%}


# ----------------------------------------------------
# contents
# ----------------------------------------------------
# contents -> (. | [\n]):* line  {% d => `"description": "${d[0].join('').trim()}"` %}
# contents -> (.:* [\n]):* line

# paragraph -> .:* [\n]   {% null %}
# contents -> paragraph:* line

# char -> . | [\n]
# # contents -> char:* line
# contents -> char:* %line
# # contents -> char:* %line [\n]:*
# contents -> %words line
contents -> %words
#  %line

# {% 
  # //d => `"description": "${d[0].join('').trim()}"` 
  # d => 312312
# %}


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

