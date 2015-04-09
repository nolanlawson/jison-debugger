/* Calculator demo -
 * Parses and executes mathematical expressions.
 * Written by Zach Carter. Annotated by Nolan Lawson.
 */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"("                   return '('
")"                   return ')'
"PI"                  return 'PI'
"E"                   return 'E'
// EOF means "end of file"
<<EOF>>               return 'EOF'
// any other characters will throw an error
.                     return 'INVALID'

/lex

// Operator associations and precedence.
//
// This is the part that defines rules like
// e.g. multiplication/division apply before
// subtraction/addition, etc. Of course you can
// also be explicit by adding parentheses, as
// we all learned in elementary school.
//
// Notice that there's this weird UMINUS thing.
// This is a special Bison/Jison trick for preferring
// the unary interpretation of the minus sign, e.g.
// -2^2 should be interpreted as (-2)^2 and not -(2^2).
//
// Details here:
// http://web.mit.edu/gnu/doc/html/bison_8.html#SEC76

%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS

%start expressions

%% /* language grammar */

// At the top level, you explicitly return
// the result. $1 refers to the first child node,
// i.e. the "e"

expressions
    : e EOF
        {return $1;}
    ;

// For everything below the top level, $$ refers to
// the thing that should be returned. yytext refers
// to the text of that node.
//
// This {$$ = ...} format is actually no
// longer necessary, because Jison 0.3
// introduced a -> shorthand. You can see the
// shorthand illustrated in the other sample
// grammars.

e
    : e '+' e
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;
