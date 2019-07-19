// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "block", "symbols": ["line", "name", "line", "props"], "postprocess": d=>`{${d[1]}, ${d[3]}}`},
    {"name": "line$string$1", "symbols": [{"literal":"-"}, {"literal":"-"}, {"literal":"-"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "line$ebnf$1", "symbols": []},
    {"name": "line$ebnf$1", "symbols": ["line$ebnf$1", {"literal":"-"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "line", "symbols": ["line$string$1", "line$ebnf$1", {"literal":"\n"}], "postprocess": d=>null},
    {"name": "name$ebnf$1", "symbols": [/[a-z ]/]},
    {"name": "name$ebnf$1", "symbols": ["name$ebnf$1", /[a-z ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "name", "symbols": ["name$ebnf$1", {"literal":"\n"}], "postprocess": d => `"name":"${d[0].join('')}"`},
    {"name": "props$ebnf$1", "symbols": []},
    {"name": "props$ebnf$1", "symbols": ["props$ebnf$1", "prop"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "props", "symbols": ["props$ebnf$1"], "postprocess": d=>d[0].join(', ')},
    {"name": "prop$ebnf$1", "symbols": [/[a-z]/]},
    {"name": "prop$ebnf$1", "symbols": ["prop$ebnf$1", /[a-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prop$ebnf$2", "symbols": [/[a-z0-9 ]/]},
    {"name": "prop$ebnf$2", "symbols": ["prop$ebnf$2", /[a-z0-9 ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prop", "symbols": ["prop$ebnf$1", /[:]/, "prop$ebnf$2", {"literal":"\n"}], "postprocess": d => `"${d[0].join('').trim()}":"${d[2].join('').trim()}"`}
]
  , ParserStart: "block"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
