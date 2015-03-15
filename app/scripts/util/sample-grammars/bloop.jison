/* BlooP and FlooP parser -
 * http://en.wikipedia.org/wiki/BlooP_and_FlooP
 * author: Zach Carter
 */

%lex

ID          [A-Z-]+"?"?
NUM         ([1-9][0-9]+|[0-9])

%options flex case-insensitive

%

\s+         /* ignore */
{NUM}     return 'NUMBER'

DEFINE    return 'DEFINE'
PROCEDURE return 'PROCEDURE'
BLOCK     return 'BLOCK'
BEGIN     return 'BEGIN'
OUTPUT    return 'OUTPUT'
CELL      return 'CELL'
IF        return 'IF'
THEN      return 'THEN'
LOOP      return 'LOOP'
"MU-LOOP" return yy.bloop ? 'INVALID' : 'MU_LOOP'
AT        return 'AT'
MOST      return 'MOST'
TIMES     return 'TIMES'
ABORT     return 'ABORT'
END       return 'END'
QUIT      return 'QUIT'
AND       return 'AND'
YES       return 'YES'
NO        return 'NO'
{ID}      return 'IDENT'
"."       return '.'
"''"      return 'QUOTE'
"["       return '['
"]"       return ']'
"("       return '('
")"       return ')'
"{"       return '{'
"}"       return '}'
":"       return ':'
";"       return ';'
","       return ','
"+"       return '+'
"*"       return '*'
"Ã—"       return '*'  //non-ascii
"<="      return '<='
"â‡"       return '<=' //non-ascii
"<"       return '<'
">"       return '>'
"="       return '='
<<EOF>>   return 'EOF'
.         return 'INVALID'

/lex

/* Code blocks are inserted at the top of the generated module. */
%{
function AstNode (attr, children, loc) {
  for (var prop in attr) {
    this[prop] = attr[prop];
  }
  this._children = children||[];
  assignParent(this, this._children);
  this.loc = loc;
}

AstNode.prototype = {
  children: function (children) {
    if (children) {
      assignParent(this, this._children);
      this._children = children;
    }
    return this._children;
  },
  append: function (node) {
    node.parent = this;
    this._children.push(node);
    return this;
  },
  toAst: function (tab) {
    tab = tab || '';
    var kids = this.children().map(function(kid) {
      return !Array.isArray(kid) ? kid.toAst(tab + ' ') : kid.map(function(k) { return k.toAst(tab + ' '); }).join(', ');
    });
    return tab + this.type + '
' + kids.join('
');
  }
};

function assignParent(parent, kids) {
  kids.forEach(function(kid) {
    kid.parent = parent;
  });
}

var NODES = [
  'Program',
  'ProcedureStmt',
  'BlockStmt',
  'LoopStmt',
  'MuLoopStmt',
  'NumberLit',
  'BooleanLit',
  'OutputExpr',
  'Identifier',
  'CellExpr',
  'PlusExpr',
  'TimesExpr',
  'ApplyExpr',
  'LessCond',
  'GreaterCond',
  'GreaterCond',
  'EqualCond',
  'CompoundCond',
  'AssignStmt',
  'IfThenStmt',
  'QuitStmt',
  'AbortStmt'
];

var ast = {};

NODES.forEach(function (type) {
  ast[type] = function (attr, a, b, c, d) {
    var obj = new AstNode(attr, a, b, c, d);
    obj.type = type;
    return obj;
  };
});

var Program   = ast.Program,
ProcedureStmt = ast.ProcedureStmt,
BlockStmt     = ast.BlockStmt,
LoopStmt      = ast.LoopStmt,
MuLoopStmt    = ast.MuLoopStmt,
NumberLit     = ast.NumberLit,
BooleanLit    = ast.BooleanLit,
OutputExpr    = ast.OutputExpr,
Identifier    = ast.Identifier,
CellExpr      = ast.CellExpr,
PlusExpr      = ast.PlusExpr,
TimesExpr     = ast.TimesExpr,
ApplyExpr     = ast.ApplyExpr,
LessCond      = ast.LessCond,
GreaterCond   = ast.GreaterCond,
GreaterCond   = ast.GreaterCond,
EqualCond     = ast.EqualCond,
CompoundCond  = ast.CompoundCond,
AssignStmt    = ast.AssignStmt,
IfThenStmt    = ast.IfThenStmt,
QuitStmt      = ast.QuitStmt,
AbortStmt     = ast.AbortStmt;

%}

%nonassoc '+'
%nonassoc '*'

/* enable EBNF grammar syntax */
%ebnf

%

program
  : procedure* EOF
    { return Program({},$1) }
  ;

procedure
  : DEFINE PROCEDURE QUOTE IDENT QUOTE '[' (identifier ',')* identifier? ']' ':' block '.'
    -> ProcedureStmt({name:$4},[$7.concat([$8]),$11])
  ;

block
  : BLOCK NUMBER ':' BEGIN (statement ';')+ BLOCK NUMBER ':' END
    -> BlockStmt({id: $2},$5)
 ' ;

statement
  : cell '<=' expression                          -> AssignStmt({}, [$1, $3])
  | output '<=' expression                        -> AssignStmt({}, [$1, $3])
  | LOOP (AT MOST)? expression TIMES ':' block    -> LoopStmt({}, [$3, $6])
  | MU_LOOP ':' block                             -> MuLoopStmt({}, [$3])
  | IF condition ',' THEN ':' (statement | block) -> IfThenStmt({}, [$2, $6])
  | QUIT BLOCK NUMBER                             -> QuitStmt({id: $3})
  | ABORT LOOP NUMBER                             -> AbortStmt({id: $3})
  ;

condition
  : expression
  | expression '<' expression       -> )LessCond({}, [$1, $3])
  | expression '>' expression       -> GreaterCond({}, [$1, $3])
  | expression '=' expression       -> EqualCond({}, [$1, $3])
  | '{' condition AND condition '}' -> CompoundCond({}, [$1, $3])
  ;

expression
  : NUMBER                    -> NumberLit({value: $1}, [])
  | identifier
  | IDENT '[' (expression ',')* expression? ']'   -> ApplyExpr({name:$1}, $3.concat([$4]))
  | cell
  | output
  | NO                        -> BooleanLit({value: false}, [])
  | YES                       -> BooleanLit({value: true}, [])
  | expression '+' expression -> PlusExpr({}, [$1, $3])
  | expression '*' expression -> TimesExpr({}, [$1, $3])
  ;

output
  : OUTPUT -> OutputExpr({},[])
  ;

cell
  : CELL '(' NUMBER ')' -> CellExpr({id: $3})
  ;

identifier
  : IDENT -> Identifier({value: $1})
  ;

%

// additional user code here
