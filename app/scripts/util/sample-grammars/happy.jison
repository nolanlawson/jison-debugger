/* "Happy happy joy joy" grammar by Nolan Lawson.
 * Based on the song of the same name.
 * Inspired by true events.
 *
 * This demonstrates a language that is impossible
 * to express with (standard) regular expressions,
 * because it's not a regular language.
 * The language is: (happy)^n (joy)^n
 * i.e. an equal number of happy's and joy's.
 *
 * Valid sentences in this language include:
 * "happy happy joy joy"
 * "happy happy happy joy joy joy"
 * etc.
 * Whereas e.g. "happy joy joy" and "happy happy joy"
 * are invalid.
 */

%lex

// you can be HAPPY as well as happy
%options flex case-insensitive

%%

\s+                   /* skip whitespace */

/* the enclosing parentheses ensure that
 * word boundaries don't matter
 * so e.g. happyhappyjoyjoy" is okay
 * See https://github.com/zaach/jison/issues/63
 */
("happy")             return 'happy'
("joy")               return 'joy'
.                     return 'INVALID'
<<EOF>>               return 'EOF'

/lex

%start root

/* ENBF is used in order to give us syntax goodies
 * like '+' and '*' repeaters, groups with '(' ')', etc.
 * See https://gist.github.com/zaach/1659274
 */
%ebnf

%%

// The variables $1, $2, $3, etc. refer to the nth
// item in the list. You can also name them.
// At the top, we return.
root
  : e EOF {return $1.toLowerCase();}
  ;

// Elsewhere, we use this arrow shorthand for
// for {{ $$ = whatever }}, where $$ means
// "give this to the parent."
e
  : happy e joy -> [$1, $2, $3].join(' ')
  | happy joy -> [$1, $2].join(' ')
  ;
