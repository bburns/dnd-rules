# Dungeons and Dragons Rules

This is an unofficial summary of the 5th edition rules, starting with the most basic and moving to more complex rules. 

https://dnd.pub


## Set Up

Clone the repository with git - 

    git clone https://github.com/bburns/dnd-rules.git

then grab the dependencies

    yarn


## Edit Rules

The rules are located in `rules/rules.nm` - the number of hash (#) symbols in the header indicates the indentation level, and properties are marked with a hat (^), e.g. 

    ---------------------------------------------------------------------------
    ## Armor Class (AC) ##
    ---------------------------------------------------------------------------

    A measure of how difficult something is to hit, 1-20+. To score a hit must roll a d20 with at least that AC. Better armor gives a higher number. 

    ^dnd: ph
    ^subtype: play


## Build Rules

To convert the `rules/rules.nm` file to `src/assets/rules.json`, which gets bundled up into the site code - in the project directory, run

    yarn build-rules


## Develop Site

To run the app in the development mode - 

    yarn start

It will open [http://localhost:3000](http://localhost:3000) in the browser - the page will reload as you make edits.


## Deploy Site

To deploy the site to the Firebase Hosting page, https://dnd-pub.web.app/ -

    yarn deploy
