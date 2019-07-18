main -> block:+
block -> whitespace:* line name line props contents props whitespace:* {% d => d.join('\n') %}
whitespace -> [ \n] {% d => null %}
line -> "----" "-":* "\n"   {% d => null %}
name -> [a-z ]:+ "\n"   {% d => '"name": "' + d.join('') + '"' %}
contents -> [a-z \n]:+ "\n"   {% d => '"description": "' + d.join('') + '"' %}
props -> (([a-z]:+) [:] ([a-z0-9 ]:+) "\n"):?   {% d => '"' + d[0] + '": "' + d.join('') + '"' %}
