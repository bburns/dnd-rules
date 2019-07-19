# neomem grammar
# parse with nearley

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

main -> block:* {% d=>`[${d.join(', ')}]` %}
block -> _ line name line props contents {% d=>`{${d[2]}, ${d[4]}, ${d[5]}}` %}
line -> "----" "-":* "\n"   {% d=>null %}
name -> [a-zA-Z0-9#'.,!@&() ]:+ "\n"   {% d => `"name":"${d[0].join('')}"` %}
props -> prop:* {% d=>d[0].join(', ') %}
prop -> [a-z]:+ [:] [a-z0-9 ]:+ "\n"   {% d => `"${d[0].join('').trim()}":"${d[2].join('').trim()}"` %}
contents -> [^:]:+ "\n"   {% d => `"description": "${d[0].join('').trim()}"` %}
