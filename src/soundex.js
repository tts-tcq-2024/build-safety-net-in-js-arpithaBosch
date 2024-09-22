// Returns the Soundex code for a given character based on predefined groups.
function getSoundexCode(char) {
  char = char.toUpperCase();
  const soundexGroups = {
    '1': /[BFPV]/,
    '2': /[CGJKQSXZ]/,
    '3': /[DT]/,
    '4': /L/,
    '5': /[MN]/,
    '6': /R/,
  };

  for (const [code, regex] of Object.entries(soundexGroups)) {
    if (regex.test(char)) return code;
  }
  return '0';
}

function getFirstLetter(name) {
  return name[0].toUpperCase();
}

// Returns the code if it's valid and different from the previous code, otherwise null
function addCodeIfValid(code, prevCode) {
  if (code === '0' || code === prevCode) {
    return null;
  }
  return code;
}

// Function to pad the Soundex result to ensure it has 4 characters
function padSoundex(soundex) {
  while (soundex.length < 4) {
    soundex.push('0');
  }
  return soundex.join('');
}

// Function to clean the name by removing special characters, numbers and spaces
function trimWord(name) {
  return name.trim().replace(/[^A-Za-z]/g, '');
}

// Processes a character to generate and a valid Soundex code to the soundex array.
function processCharacter(char, prevCode, soundex) {
  const code = getSoundexCode(char);
  const validCode = addCodeIfValid(code, prevCode);
  if (validCode) soundex.push(validCode);
  return code;
}

// Constructs the Soundex code for the cleaned part of a name.
function buildSoundex(formattedWord) {
  const soundex = [getFirstLetter(formattedWord)];
  let prevCode = getSoundexCode(soundex[0]);

  for (let character = 1; character < formattedWord.length && soundex.length < 4; character++) {
    prevCode = processCharacter(formattedWord[character], prevCode, soundex);
  }
  return padSoundex(soundex);
}

// Formats the input word and generates its Soundex code
function processWord(word) {
  const formattedWord = trimWord(word);
  if (!formattedWord) return '0000';

  return buildSoundex(formattedWord);
}

function generateSoundex(word) {
  if (!word) return '0000';
  return processWord(word);
}

module.exports = {
  generateSoundex,
};
