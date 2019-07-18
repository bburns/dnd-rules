// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main$ebnf$1", "symbols": ["block"]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "block"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1"]},
    {"name": "block", "symbols": ["line", "name", "line", "props", "contents", "props"]},
    {"name": "line$string$1", "symbols": [{"literal":"-"}, {"literal":"-"}, {"literal":"-"}, {"literal":"-"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "line", "symbols": ["line$string$1"]},
    {"name": "name$ebnf$1", "symbols": [/[a-z ]/]},
    {"name": "name$ebnf$1", "symbols": ["name$ebnf$1", /[a-z ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "name", "symbols": ["name$ebnf$1", {"literal":"\n"}]},
    {"name": "contents$ebnf$1", "symbols": [/[a-z \n]/]},
    {"name": "contents$ebnf$1", "symbols": ["contents$ebnf$1", /[a-z \n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "contents", "symbols": ["contents$ebnf$1", {"literal":"\n"}]},
    {"name": "props$ebnf$1$subexpression$1$ebnf$1", "symbols": [/[a-z]/]},
    {"name": "props$ebnf$1$subexpression$1$ebnf$1", "symbols": ["props$ebnf$1$subexpression$1$ebnf$1", /[a-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "props$ebnf$1$subexpression$1$ebnf$2", "symbols": [/[a-z0-9 ]/]},
    {"name": "props$ebnf$1$subexpression$1$ebnf$2", "symbols": ["props$ebnf$1$subexpression$1$ebnf$2", /[a-z0-9 ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "props$ebnf$1$subexpression$1", "symbols": ["props$ebnf$1$subexpression$1$ebnf$1", /[:]/, "props$ebnf$1$subexpression$1$ebnf$2", {"literal":"\n"}]},
    {"name": "props$ebnf$1", "symbols": ["props$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "props$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "props", "symbols": ["props$ebnf$1"]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
