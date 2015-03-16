/*
 * Toy English grammar, by Nolan Lawson.
 * A very simple context-free grammar.
 *
 * It demonstrates the ambiguity of phrases like
 * "I saw the astronomer with the telescope."
 * You can toggle between the two interpretations
 * by removing rules.
 */

%lex

%%

\s+                   /* skip whitespace */
// yytext means just the text itself
\w+                   return yytext.toLowerCase()
.                     /* ignore any non-words */
<<EOF>>               return 'EOF'

/lex

%start root

/* ENBF is used in order to give us syntax goodies
 * like '+' and '*' repeaters, groups with '(' ')', etc.
 * See https://gist.github.com/zaach/1659274
 */
%ebnf

%%

root
  : S EOF {return $1;}
  ;

S
  : NP VP -> {sentence: [$NP, $VP]}
  ;

NP
  : N -> {nounPhrase: $N}
  | D N -> {nounPhrase: [$D, $N]}
  | D N PP -> {nounPhrase: [$D, $N, $PP]}
  ;

D
  : the -> {determiner: $1}
  ;

N
  : i | astronomer | telescope | me -> {noun: $1}
  ;

VP
  : V NP -> {verbPhrase: [$V, $NP]}
  | V NP PP -> {verbPhrase: [$V, $NP, $PP]}
  ;

V
  : saw -> {verb: $1}
  ;

PP
  : P NP -> {prepositionalPhrase: [$P, $NP]}
  ;

P
  : with -> {preposition: $1}
  ;
