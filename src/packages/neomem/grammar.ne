# neomem grammar
# parse with nearley

# @builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

# main -> block:*
block -> line name line {% d=>`{${d[1]}}` %}
# block -> _ line name line props contents props _ {% d => d.join('\n') %}
line -> "----" "-":* "\n"   {% d=>null %}
name -> [a-z ]:+ "\n"   {% d => `"name": "${d[0].join('')}"` %}
# contents -> [a-z \n]:+ "\n"   {% d => '"description": "' + d + '"' %}
# props -> (([a-z]:+) [:] ([a-z0-9 ]:+) "\n"):?   {% d => '"' + d[0] + '": "' + d.join('') + '"' %}
