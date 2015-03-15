'use strict';

var grammars = [
  {
    name: 'Calculator',
    grammar: require('./sample-grammars/calculator.jison'),

    sampleText: '2 + 7 * 5'
  },
  {
    name: 'Happy Happy Joy Joy',
    grammar: require('./sample-grammars/happy.jison'),
    sampleText: 'happy happy joy joy'
  },
  //{
  //  name: 'BlooP and FlooP',
  //  grammar: require('./sample-grammars/bloop.jison'),
  //  sampleText: "DEFINE PROCEDURE ''FACTORIAL'' [N]: BLOCK 0: BEGIN         OUTPUT <= 1;         CELL(0) <= 1;         LOOP N TIMES:         BLOCK 1: BEGIN                 OUTPUT <= OUTPUT * CELL(0);                 CELL(0) <= CELL(0) + 1;         BLOCK 1: END; BLOCK 0: END."
  //}
  {
    grammar: require('./sample-grammars/toy-english.jison'),
    sampleText: 'I saw the astronomer with the telescope.',
    name: 'Toy English'
  },
  {
    name: 'Musical Chords',
    sampleText: 'G#maj7/Bb',
    grammar: require('./sample-grammars/chords.jison')
  }
];

module.exports = {
  SAMPLE_GRAMMARS: grammars,
  INITIAL_GRAMMAR: grammars[0].grammar,
  INITIAL_TEXT_TO_PARSE: grammars[0].sampleText
};
