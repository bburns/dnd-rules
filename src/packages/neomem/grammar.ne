main -> block:+
block -> line name line props contents props
line -> "----\n"
name -> [a-z ]:+ "\n"
contents -> [a-z \n]:+ "\n"
props -> ([a-z]:+ [:] [a-z0-9 ]:+ "\n"):?
