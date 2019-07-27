:: compile and test the grammar
:: give it a part of the grammar to test and it will test against the relevant test file.
:: e.g. `test props` will test the `props` nonterminal with the file `in-props.nm`.
:: -s means start with the given nonterminal
@compile && nearley-test grammar.js -s %1 < in-%1.nm 
