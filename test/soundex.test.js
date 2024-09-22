const {generateSoundex} = require('../src/soundex');
const {assert} = require('chai');

describe('Soundex Algorithm Tests', () => {
  //  When given an empty string, the output must pad with zeros to ensure
  //  the length is 4 characters.
  it('Function handles empty strings', () => {
    assert.strictEqual(generateSoundex(''), '0000');
  });

  //  When a single character string is given,
  //  the output must return the first letter padded with zeros to
  //  ensure the length is 4 characters.
  it('Function handles single characters', () => {
    assert.strictEqual(generateSoundex('A'), 'A000');
    assert.strictEqual(generateSoundex('B'), 'B000');
  });

  // When a word containing both vowels and consonants is given,
  //  the function must ignore vowels and certain consonants('w', 'h').
  //  The output should begin with the first letter of the word,
  // followed by the corresponding Soundex codes of the remaining valid consonants,
  // and be padded with zeros if necessary to ensure the code has 4 characters.
  it('Function handles words with vowels and consonants', () => {
    assert.strictEqual(generateSoundex('art'), 'A630');
    assert.strictEqual(generateSoundex('Robert'), 'R163');
    assert.strictEqual(generateSoundex('Aeiou'), 'A000');
    assert.strictEqual(generateSoundex('Abeioucd'), 'A123');
  });

  //  Duplicate consonants should be treated as a single occurrence in the Soundex code.
  //  Only the first instance is encoded, and subsequent identical consonants are ignored.
  it('Function should handle Duplicate Consonants', () => {
    assert.strictEqual(generateSoundex('Hello'), 'H400');
    assert.strictEqual(generateSoundex('Tennessee'), 'T520');
  });

  // The function should handle words with mixed upper and lower cases by
  // treating them the same, producing the correct Soundex code.
  //  Case differences should not affect the output.
  it('Function should handle words with mixed cases correctly', () => {
    assert.strictEqual(generateSoundex('McDonald'), 'M235');
  });

  // Special characters should be ignored during encoding,
  //  and the Soundex code should only include valid consonants.
  it('Function should ignore special characters ', () => {
    assert.strictEqual(generateSoundex('Anne-Marie'), 'A556');
    assert.strictEqual(generateSoundex('John123!@#'), 'J500');
  });

  // Names with similar sounds but different spellings should result in the same Soundex code,
  //  as Soundex focuses on phonetic similarity.
  it('Function should produce the same Soundex code for names with similar sounds', () => {
    assert.strictEqual(generateSoundex('Jackson'), 'J250');
    assert.strictEqual(generateSoundex('Jaxon'), 'J250');
  });

  // When a name consists of multiple words, only the first word should be encoded,
  // and the remaining words should be ignored.
  it('Function should correctly handle string with multiple words', () => {
    assert.strictEqual(generateSoundex('Alexander Grahambell'), 'A425');
  });

  // Numerical digits should be ignored when encoding the name.
  it('Function should ignore numerical digits and special characters in the names', () => {
    assert.strictEqual(generateSoundex('1234'), '0000');
    assert.strictEqual(generateSoundex('2Krishh45'), 'K620');
  });

  // Leading and trailing spaces should be ignored when processing the name.
  // The Soundex code should be based solely on valid alphabetic characters.
  it('Function should correctly handle names with leading and trailing spaces', () => {
    assert.strictEqual(generateSoundex('  Rita  '), 'R300');
    assert.strictEqual(generateSoundex('   "Kripa"   '), 'K610');
  });
});
