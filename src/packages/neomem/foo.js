const nearley = require("nearley");
const grammar = require("./grammar.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
parser.feed(`----
hello
----
type: fish
this is some contents


`);

// parser.results is an array of possible parsings.
// console.log(parser.results); // [[[[ "foo" ],"\n" ]]]
console.log(parser.results[0][0]); // [[[[ "foo" ],"\n" ]]]
