// test/soundex.test.js

const {expect} = require('chai');
const {generateSoundex} = require('../src/soundex');

describe('Soundex Algorithm', () => {
  it('should handle empty strings', () => {
    expect(generateSoundex('')).to.equal('0000');
  });

  it('should handle single characters', () => {
    expect(generateSoundex('A')).to.equal('A000');
    expect(generateSoundex('B')).to.equal('B000');
  });

  it('should handle normal words', () => {
    expect(generateSoundex('Art')).to.equal('A630');
    expect(generateSoundex('Robert')).to.equal('R163');
    expect(generateSoundex('Hello')).to.equal('H400');
  });

  it('should handle mixed case names', () => {
    expect(generateSoundex('McDonald')).to.equal('M235');
    expect(generateSoundex("o'connor")).to.equal("O256");
  });

  it('should handle names with special characters', () => {
    expect(generateSoundex('Anne-Marie')).to.equal('A556');
    expect(generateSoundex('O$Hara')).to.equal('O600');
  });

  it('should handle names with repeated characters', () => {
    expect(generateSoundex('Jackson')).to.equal('J250');
    expect(generateSoundex('Jaxon')).to.equal('J250');
  });

  it('should handle names with all vowels', () => {
    expect(generateSoundex('Aeio')).to.equal('A000');
  });

  it('should handle names with single consonants and vowels', () => {
    expect(generateSoundex('Abe')).to.equal('A100');
  });

  it('should handle long names with multiple parts', () => {
    expect(generateSoundex('Alexander Grahambell')).to.equal('A425');
  });

  it('should handle names with numerical digits', () => {
    expect(generateSoundex('1234')).to.equal('0000');
    expect(generateSoundex('2Krishh45')).to.equal('K620');
    expect(generateSoundex('Jane123')).to.equal('J500');
  });

  it('should handle names with leading and trailing spaces', () => {
    expect(generateSoundex('  Rita  ')).to.equal('R300');
    expect(generateSoundex('   "Kripa"   ')).to.equal('K610');
  });

  it('should handle names with mixed special characters and spaces', () => {
    expect(generateSoundex('   John-Doe   ')).to.equal('J530');
    expect(generateSoundex("      O'Connor Smith")).to.equal('O256');
  });

  it('should handle names with only special characters', () => {
    expect(generateSoundex('!@#$%^&*()')).to.equal('0000');
  });

  it('should handle names with numbers and special characters mixed', () => {
    expect(generateSoundex('John123!@#')).to.equal('J500');
  });
});
