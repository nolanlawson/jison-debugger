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
];

module.exports = {
  SAMPLE_GRAMMARS: grammars,
  INITIAL_GRAMMAR: grammars[0].grammar,
  INITIAL_TEXT_TO_PARSE: grammars[0].sampleText
};
