// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "main$ebnf$1", "symbols": []},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "block"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1"], "postprocess": d=>`[${d.join(', ')}]`},
    {"name": "block", "symbols": ["_", "line", "name", "line", "props", "contents"], "postprocess": d=>`{${d[2]}, ${d[4]}, ${d[5]}}`},
    {"name": "line$string$1", "symbols": [{"literal":"-"}, {"literal":"-"}, {"literal":"-"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "line$ebnf$1", "symbols": []},
    {"name": "line$ebnf$1", "symbols": ["line$ebnf$1", {"literal":"-"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "line", "symbols": ["line$string$1", "line$ebnf$1", {"literal":"\n"}], "postprocess": d=>null},
    {"name": "name$ebnf$1", "symbols": [/[a-zA-Z0-9#'.,!@&() ]/]},
    {"name": "name$ebnf$1", "symbols": ["name$ebnf$1", /[a-zA-Z0-9#'.,!@&() ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "name", "symbols": ["name$ebnf$1", {"literal":"\n"}], "postprocess": d => `"name":"${d[0].join('')}"`},
    {"name": "contents$ebnf$1", "symbols": [/[^:]/]},
    {"name": "contents$ebnf$1", "symbols": ["contents$ebnf$1", /[^:]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "contents", "symbols": ["contents$ebnf$1", {"literal":"\n"}], "postprocess": d => `"description": "${d[0].join('').trim()}"`},
    {"name": "props$ebnf$1", "symbols": []},
    {"name": "props$ebnf$1", "symbols": ["props$ebnf$1", "prop"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "props", "symbols": ["props$ebnf$1"], "postprocess": d=>d[0].join(', ')},
    {"name": "prop$ebnf$1", "symbols": [/[a-z]/]},
    {"name": "prop$ebnf$1", "symbols": ["prop$ebnf$1", /[a-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prop$ebnf$2", "symbols": [/[a-z0-9 ]/]},
    {"name": "prop$ebnf$2", "symbols": ["prop$ebnf$2", /[a-z0-9 ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prop", "symbols": ["prop$ebnf$1", /[:]/, "prop$ebnf$2", {"literal":"\n"}], "postprocess": d => `"${d[0].join('').trim()}":"${d[2].join('').trim()}"`}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
