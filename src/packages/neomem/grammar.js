// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "block", "symbols": ["line", "name", "line"], "postprocess": d=>`{${d[1]}}`},
    {"name": "line$string$1", "symbols": [{"literal":"-"}, {"literal":"-"}, {"literal":"-"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "line$ebnf$1", "symbols": []},
    {"name": "line$ebnf$1", "symbols": ["line$ebnf$1", {"literal":"-"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "line", "symbols": ["line$string$1", "line$ebnf$1", {"literal":"\n"}], "postprocess": d=>null},
    {"name": "name$ebnf$1", "symbols": [/[a-z ]/]},
    {"name": "name$ebnf$1", "symbols": ["name$ebnf$1", /[a-z ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "name", "symbols": ["name$ebnf$1", {"literal":"\n"}], "postprocess": d => `"name": "${d[0].join('')}"`}
]
  , ParserStart: "block"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
