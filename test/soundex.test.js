const { assert } = require('chai');
const { generateSoundex } = require('../src/soundex');

describe('Soundex Algorithm', () => {
  it('should handle empty strings', () => {
    assert.strictEqual(generateSoundex(''), '0000');
  });

  it('should handle single characters', () => {
    assert.strictEqual(generateSoundex('A'), 'A000');
    assert.strictEqual(generateSoundex('B'), 'B000');
  });

  it('should handle normal words', () => {
    assert.strictEqual(generateSoundex('Art'), 'A630');
    assert.strictEqual(generateSoundex('Robert'), 'R163');
    assert.strictEqual(generateSoundex('Hello'), 'H400');
  });

  it('should handle mixed case names', () => {
    assert.strictEqual(generateSoundex('McDonald'), 'M235');
    assert.strictEqual(generateSoundex("o'connor"), 'O256');
  });

  it('should handle names with special characters', () => {
    assert.strictEqual(generateSoundex('Anne-Marie'), 'A556');
    assert.strictEqual(generateSoundex('O$Hara'), 'O600');
  });

  it('should handle names with repeated characters', () => {
    assert.strictEqual(generateSoundex('Jackson'), 'J250');
    assert.strictEqual(generateSoundex('Jaxon'), 'J250');
  });

  it('should handle names with all vowels', () => {
    assert.strictEqual(generateSoundex('Aeio'), 'A000');
  });

  it('should handle names with single consonants and vowels', () => {
    assert.strictEqual(generateSoundex('Abe'), 'A100');
  });

  it('should handle long names with multiple parts', () => {
    assert.strictEqual(generateSoundex('Alexander Grahambell'), 'A425');
  });

  it('should handle names with numerical digits', () => {
    assert.strictEqual(generateSoundex('1234'), '0000');
    assert.strictEqual(generateSoundex('2Krishh45'), 'K620');
    assert.strictEqual(generateSoundex('Jane123'), 'J500');
  });

  it('should handle names with leading and trailing spaces', () => {
    assert.strictEqual(generateSoundex('  Rita  '), 'R300');
    assert.strictEqual(generateSoundex('   "Kripa"   '), 'K610');
  });

  it('should handle names with mixed special characters and spaces', () => {
    assert.strictEqual(generateSoundex('   John-Doe   '), 'J530');
    assert.strictEqual(generateSoundex("      O'Connor Smith"), 'O256');
  });

  it('should handle names with only special characters', () => {
    assert.strictEqual(generateSoundex('!@#$%^&*()'), '0000');
  });

  it('should handle names with numbers and special characters mixed', () => {
    assert.strictEqual(generateSoundex('John123!@#'), 'J500');
  });
});
