# System Reference Document 5 Rules

This is an unofficial summary of the SRD5 rules, starting with the most basic and moving to more complex rules. 

https://dnd.pub


## Contribute

To update the rules, you can <a href="https://github.com/bburns/dnd-rules/edit/master/rules/rules.nm">edit the file `rules/rules.nm` directly</a>. See below for an explanation of the format.

To file an issue, see the <a href="https://github.com/bburns/dnd-rules/issues">Issues page</a>.

Or send an email to <a href="mailto:brian@dnd.pub">brian@dnd.pub</a>.


## Rule Format

The rules are located in `rules/rules.nm` - the rule name is offset by dashes, the rule contents are Markdown, with Wiki-like internal links to other rules, and properties are marked with a hat (^), e.g. 

        ---------------------------------------------------------------------------
        # Ability Score #
        ---------------------------------------------------------------------------

        Measures of different abilities: 

        * Strength
        * Dexterity
        * Constitution
        * Intelligence
        * Wisdom
        * Charisma

        Max 20 for characters, 30 for monsters/divines. 

        (*Intermediate*: Used to calculate [[Ability Modifier|Ability Modifiers]]. Each has associated [[Skill|Skills]], e.g. Strength has Athletics.)

        ^type: rule
        ^ref: ph12,173
        ^phase: character
        ^complexity: basic


## About

The site itself is made with React, with <a href="https://github.com/desandro/colcade">Colcade</a> to fit the rules into tiles, and <a href="https://github.com/remarkjs/remark">Remark</a> to convert Markdown to HTML. 

The rules are converted to JSON with <a href="https://github.com/bburns/dnd-rules/blob/master/scripts/nm2json.js">nm2json.js</a>, and are bundled into the final site.


## Set Up

Clone the repository with git - 

    git clone https://github.com/bburns/dnd-rules.git

then grab the dependencies

    yarn


## Develop Site

To run the app in the development mode - 

    yarn start

It will open [http://localhost:3000](http://localhost:3000) in the browser - the page will reload as you make edits, including to the rules file.


## Deploy Site

To deploy the site to the Firebase Hosting page, https://dnd-pub.web.app/ -

    yarn deploy


## License

This site is GPL. The rule contents are OGL (Open Game License) - see <a href="https://github.com/bburns/dnd-rules/blob/master/OGL">here</a>.

