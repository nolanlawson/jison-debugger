'use strict';

var grammars = [
  {
    name: 'Calculator',
    grammar: '/* description: Parses end executes mathematical expressions. */\n\n/* lexical grammar */\n%lex\n%%\n\n\\s+                   /* skip whitespace */\n[0-9]+("."[0-9]+)?\\b  return \'NUMBER\'\n"*"                   return \'*\'\n"/"                   return \'/\'\n"-"                   return \'-\'\n"+"                   return \'+\'\n"^"                   return \'^\'\n"("                   return \'(\'\n")"                   return \')\'\n"PI"                  return \'PI\'\n"E"                   return \'E\'\n<<EOF>>               return \'EOF\'\n.                     return \'INVALID\'\n\n/lex\n\n/* operator associations and precedence */\n\n%left \'+\' \'-\'\n%left \'*\' \'/\'\n%left \'^\'\n%left UMINUS\n\n%start expressions\n\n%% /* language grammar */\n\nexpressions\n    : e EOF\n        {return $1;}\n    ;\n\ne\n    : e \'+\' e\n        {$$ = $1+$3;}\n    | e \'-\' e\n        {$$ = $1-$3;}\n    | e \'*\' e\n        {$$ = $1*$3;}\n    | e \'/\' e\n        {$$ = $1/$3;}\n    | e \'^\' e\n        {$$ = Math.pow($1, $3);}\n    | \'-\' e %prec UMINUS\n        {$$ = -$2;}\n    | \'(\' e \')\'\n        {$$ = $2;}\n    | NUMBER\n        {$$ = Number(yytext);}\n    | E\n        {$$ = Math.E;}\n    | PI\n        {$$ = Math.PI;}\n    ;\n',

    sampleText: '2 + 7 * 5'
  },
  {
    name: 'Happy Happy Joy Joy',
    grammar: '/* "Happy happy joy joy" grammar by Nolan Lawson.\n * Based on the song of the same name.\n * Inspired by true events.\n *\n * This demonstrates a language that is impossible\n * to express with (standard) regular expressions,\n * because it\'s not a regular language.\n * The language is: (happy)^n (joy)^n\n * i.e. an equal number of happy\'s and joy\'s.\n * \n * Valid sentences in this language include:\n * "happy happy joy joy"\n * "happy happy happy joy joy joy"\n * etc.\n * Whereas e.g. "happy joy joy" and "happy happy joy"\n * are invalid.\n */\n\n%lex\n\n// you can be HAPPY as well as happy\n%options flex case-insensitive\n\n%%\n\n\\s+                   /* skip whitespace */\n\n/* the enclosing parentheses ensure that \n * word boundaries don\'t matter\n * so e.g. happyhappyjoyjoy" is okay\n * See https://github.com/zaach/jison/issues/63\n */\n("happy")             return \'happy\'\n("joy")               return \'joy\'\n<<EOF>>               return \'EOF\'\n\n/lex\n\n%start root\n\n/* ENBF is used in order to give us syntax goodies\n * like \'+\' and \'*\' repeaters, groups with \'(\' \')\', etc.\n * See https://gist.github.com/zaach/1659274\n */\n%ebnf\n\n%%\n\n// The variables $1, $2, $3, etc. refer to the nth\n// item in the list. You can also name them.\n// At the top, we return.\nroot\n  : e EOF {return $1.toLowerCase();}\n  ;\n\n// Elsewhere, we use this arrow shorthand for\n// for {{ $$ = whatever }}, where $$ means\n// "give this to the parent."\ne\n  : happy e joy -> [$1, $2, $3].join(\' \')\n  | happy joy -> [$1, $2].join(\' \')\n  ;',
    sampleText: 'happy happy joy joy'
  }
  //,
  //{
  //  name: 'BlooP and FlooP',
  //  grammar: "/* BlooP and FlooP parser - \n * http://en.wikipedia.org/wiki/BlooP_and_FlooP\n * author: Zach Carter\n */\n\n%lex\n\nID          [A-Z-]+\"?\"?\nNUM         ([1-9][0-9]+|[0-9])\n\n%options flex case-insensitive\n\n%%\n\n\\s+         /* ignore */\n{NUM}     return 'NUMBER'\n\nDEFINE    return 'DEFINE'\nPROCEDURE return 'PROCEDURE'\nBLOCK     return 'BLOCK'\nBEGIN     return 'BEGIN'\nOUTPUT    return 'OUTPUT'\nCELL      return 'CELL'\nIF        return 'IF'\nTHEN      return 'THEN'\nLOOP      return 'LOOP'\n\"MU-LOOP\" return yy.bloop ? 'INVALID' : 'MU_LOOP'\nAT        return 'AT'\nMOST      return 'MOST'\nTIMES     return 'TIMES'\nABORT     return 'ABORT'\nEND       return 'END'\nQUIT      return 'QUIT'\nAND       return 'AND'\nYES       return 'YES'\nNO        return 'NO'\n{ID}      return 'IDENT'\n\".\"       return '.'\n\"''\"      return 'QUOTE'\n\"[\"       return '['\n\"]\"       return ']'\n\"(\"       return '('\n\")\"       return ')'\n\"{\"       return '{'\n\"}\"       return '}'\n\":\"       return ':'\n\";\"       return ';'\n\",\"       return ','\n\"+\"       return '+'\n\"*\"       return '*'\n\"\u00c3\u2014\"       return '*'  //non-ascii\n\"<=\"      return '<='\n\"\u00e2\u2021\"       return '<=' //non-ascii\n\"<\"       return '<'\n\">\"       return '>'\n\"=\"       return '='\n<<EOF>>   return 'EOF'\n.         return 'INVALID'\n\n/lex\n\n/* Code blocks are inserted at the top of the generated module. */\n%{\nfunction AstNode (attr, children, loc) {\n  for (var prop in attr) {\n    this[prop] = attr[prop];\n  }\n  this._children = children||[];\n  assignParent(this, this._children);\n  this.loc = loc;\n}\n\nAstNode.prototype = {\n  children: function (children) {\n    if (children) {\n      assignParent(this, this._children);\n      this._children = children;\n    }\n    return this._children;\n  },\n  append: function (node) {\n    node.parent = this;\n    this._children.push(node);\n    return this;\n  },\n  toAst: function (tab) {\n    tab = tab || '';\n    var kids = this.children().map(function(kid) {\n      return !Array.isArray(kid) ? kid.toAst(tab + ' ') : kid.map(function(k) { return k.toAst(tab + ' '); }).join(', ');\n    });\n    return tab + this.type + '\n' + kids.join('\n');\n  }\n};\n\nfunction assignParent(parent, kids) {\n  kids.forEach(function(kid) {\n    kid.parent = parent;\n  });\n}\n\nvar NODES = [\n  'Program',\n  'ProcedureStmt',\n  'BlockStmt',\n  'LoopStmt',\n  'MuLoopStmt',\n  'NumberLit',\n  'BooleanLit',\n  'OutputExpr',\n  'Identifier',\n  'CellExpr',\n  'PlusExpr',\n  'TimesExpr',\n  'ApplyExpr',\n  'LessCond',\n  'GreaterCond',\n  'GreaterCond',\n  'EqualCond',\n  'CompoundCond',\n  'AssignStmt',\n  'IfThenStmt',\n  'QuitStmt',\n  'AbortStmt'\n];\n\nvar ast = {};\n\nNODES.forEach(function (type) {\n  ast[type] = function (attr, a, b, c, d) {\n    var obj = new AstNode(attr, a, b, c, d);\n    obj.type = type;\n    return obj;\n  };\n});\n\nvar Program   = ast.Program,\nProcedureStmt = ast.ProcedureStmt,\nBlockStmt     = ast.BlockStmt,\nLoopStmt      = ast.LoopStmt,\nMuLoopStmt    = ast.MuLoopStmt,\nNumberLit     = ast.NumberLit,\nBooleanLit    = ast.BooleanLit,\nOutputExpr    = ast.OutputExpr,\nIdentifier    = ast.Identifier,\nCellExpr      = ast.CellExpr,\nPlusExpr      = ast.PlusExpr,\nTimesExpr     = ast.TimesExpr,\nApplyExpr     = ast.ApplyExpr,\nLessCond      = ast.LessCond,\nGreaterCond   = ast.GreaterCond,\nGreaterCond   = ast.GreaterCond,\nEqualCond     = ast.EqualCond,\nCompoundCond  = ast.CompoundCond,\nAssignStmt    = ast.AssignStmt,\nIfThenStmt    = ast.IfThenStmt,\nQuitStmt      = ast.QuitStmt,\nAbortStmt     = ast.AbortStmt;\n\n%}\n\n%nonassoc '+'\n%nonassoc '*'\n\n/* enable EBNF grammar syntax */\n%ebnf\n\n%%\n\nprogram\n  : procedure* EOF\n    { return Program({},$1) }\n  ;\n\nprocedure\n  : DEFINE PROCEDURE QUOTE IDENT QUOTE '[' (identifier ',')* identifier? ']' ':' block '.'\n    -> ProcedureStmt({name:$4},[$7.concat([$8]),$11])\n  ;\n\nblock\n  : BLOCK NUMBER ':' BEGIN (statement ';')+ BLOCK NUMBER ':' END\n    -> BlockStmt({id: $2},$5)\n ' ;\n\nstatement\n  : cell '<=' expression                          -> AssignStmt({}, [$1, $3])\n  | output '<=' expression                        -> AssignStmt({}, [$1, $3])\n  | LOOP (AT MOST)? expression TIMES ':' block    -> LoopStmt({}, [$3, $6])\n  | MU_LOOP ':' block                             -> MuLoopStmt({}, [$3])\n  | IF condition ',' THEN ':' (statement | block) -> IfThenStmt({}, [$2, $6])\n  | QUIT BLOCK NUMBER                             -> QuitStmt({id: $3})\n  | ABORT LOOP NUMBER                             -> AbortStmt({id: $3})\n  ;\n\ncondition\n  : expression\n  | expression '<' expression       -> )LessCond({}, [$1, $3])\n  | expression '>' expression       -> GreaterCond({}, [$1, $3])\n  | expression '=' expression       -> EqualCond({}, [$1, $3])\n  | '{' condition AND condition '}' -> CompoundCond({}, [$1, $3])\n  ;\n\nexpression\n  : NUMBER                    -> NumberLit({value: $1}, [])\n  | identifier\n  | IDENT '[' (expression ',')* expression? ']'   -> ApplyExpr({name:$1}, $3.concat([$4]))\n  | cell\n  | output\n  | NO                        -> BooleanLit({value: false}, [])\n  | YES                       -> BooleanLit({value: true}, [])\n  | expression '+' expression -> PlusExpr({}, [$1, $3])\n  | expression '*' expression -> TimesExpr({}, [$1, $3])\n  ;\n\noutput\n  : OUTPUT -> OutputExpr({},[])\n  ;\n\ncell\n  : CELL '(' NUMBER ')' -> CellExpr({id: $3})\n  ;\n\nidentifier\n  : IDENT -> Identifier({value: $1})\n  ;\n\n%%\n\n// additional user code here\n",
  //  sampleText: "DEFINE PROCEDURE ''FACTORIAL'' [N]: BLOCK 0: BEGIN         OUTPUT <= 1;         CELL(0) <= 1;         LOOP N TIMES:         BLOCK 1: BEGIN                 OUTPUT <= OUTPUT * CELL(0);                 CELL(0) <= CELL(0) + 1;         BLOCK 1: END; BLOCK 0: END."
  //}
];

module.exports = {
  SAMPLE_GRAMMARS: grammars,
  INITIAL_GRAMMAR: grammars[0].grammar,
  INITIAL_TEXT_TO_PARSE: grammars[0].sampleText
};
