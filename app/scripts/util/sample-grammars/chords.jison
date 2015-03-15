/*
 * Musical chord parser by Nolan Lawson.
 * Try strings like
 * "C/G" or "Fmaj7" or "Abminadd9" or "Dsus4"
 * or "C5" or "G#maj7/Bb"
 *
 * You don't actually need a context-free grammar to
 * parse chords (a regex will suffice), but this
 * demonstrates how succinct such an implementation can
 * be. For a comparison with the regex approach, see
 * https://github.com/nolanlawson/chord-magic
 */

%lex
%%

\s+                         /* skip whitespace */
[A-G]b?\#?                    return 'CHORD_ROOT'
//
// qualities
//
(major|maj|M)                 return 'Major'
(minor|min|m)                 return 'Minor'
(aug|augmented|\+)            return 'Augmented'
(dim|diminished)              return 'Diminished'
//
// extendeds
//
(Major|maj7|Maj7|M7|\+7)      return 'Major7'
(Minor|m7|Min7|min7|minor7)   return 'Minor7'
(Major|7|dom7|dominant7)      return 'Dominant7'
(Diminished|dim7|diminished7) return 'Diminished7'
(Major|maj9|M9|9)             return 'Major9'
(Major|maj11|M11|11)          return 'Major11'
(Major|maj13|M13|13)          return 'Major13'
(Major|7#5|7\(#5\))          return 'AugmentedDominant7'
(Major|maj7#5|maj7\(#5\))     return 'AugmentedMajor7'
(Minor|min9|m9|minor9)        return 'Minor9'
//
// addeds
//
(add9|2) return 'Add9'
(add11|4) return 'Add4'
(6/9) return 'SixNine'
(6|maj6|major6|M6) return 'Major6'
// duh duh DUH, duh duh DUH-duh, duh duh DUH, duh duh
// ((c) Deep Purple)
5 return 'PowerChord'
//
// suspendeds
//
(sus2|suspended2)            return 'Sus2'
(sus4|suspended|sus)         return 'Sus4'
'/'                   return '/'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%ebnf

// operator associations and precedence

%start chord

%% /* language grammar */

chord
  : c EOF {return $1;}
  ;

//
// This is a neat thing about the ebnf format:
// you can throw in +'s and *'s and ()'s and ?'s
// like we're used to with regular expressions.
// And you can access those variables easily!
//

c
  : root quality? extended? added? suspended? override?
      {{ $$ =
        {
          root: $root,
          quality: $c_option0 || 'Major',
          extended: $c_option1,
          added: $c_option2,
          suspended: $c_option3,
          overridingRoot: $c_option4
        };
      }}
  ;

root
  : CHORD_ROOT -> $1
  ;

quality
  : Major -> 'Major'
  | Minor -> 'Minor'
  | Augmented -> 'Augmented'
  | Diminished -> 'Diminished'
  ;

extended
  : Major7 -> "Major7"
  | Minor7 -> "Minor7"
  | Dominant7 -> "Dominant7"
  | Diminished7 -> "Diminished7"
  | Major9 -> "Major9"
  | Major11 -> "Major11"
  | Major13 -> "Major13"
  | AugmentedDominant7 -> "AugmentedDominant7"
  | AugmentedMajor7 -> "AugmentedMajor7"
  | Minor9 -> "Minor9"
  ;

added
  : Add9 -> 'Add9'
  | Add4 -> 'Add4'
  | SixNine -> 'SixNine'
  | Major6 -> 'Major6'
  | PowerChord -> 'PowerChord'
  ;

suspended
  : Sus2 -> 'Sus2'
  | Sus4 -> 'Sus4'
  ;

override
  : '/' CHORD_ROOT -> $2
  ;
