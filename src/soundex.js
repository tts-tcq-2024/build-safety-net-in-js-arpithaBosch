function getSoundexCode(char) {
  const soundexDict = {
    B: '1', F: '1', P: '1', V: '1',
    C: '2', G: '2', J: '2', K: '2', Q: '2', S: '2', X: '2', Z: '2',
    D: '3', T: '3',
    L: '4',
    M: '5', N: '5',
    R: '6',
  };
  return soundexDict[char.toUpperCase()] || '0';
}

function getFirstLetter(name) {
  return name[0].toUpperCase();
}

function addCodeIfValid(code, prevCode) {
  return code !== '0' && code !== prevCode ? code : null;
}

function padSoundex(soundex) {
  while (soundex.length < 4) {
    soundex.push('0');
  }
  return soundex.join('');
}

function cleanName(name) {
  return name.trim().replace(/[^A-Za-z]/g, '');
}

function processPart(part) {
  const cleanedPart = cleanName(part);
  if (!cleanedPart) return '0000';

  const soundex = [getFirstLetter(cleanedPart)];
  let prevCode = getSoundexCode(soundex[0]);

  for (let i = 1; i < cleanedPart.length && soundex.length < 4; i++) {
    const code = getSoundexCode(cleanedPart[i]);
    const validCode = addCodeIfValid(code, prevCode);
    if (validCode) soundex.push(validCode);
    prevCode = code;
  }

  return padSoundex(soundex);
}

function generateSoundex(name) {
  if (!name) return '0000';
  return processPart(name);
}

module.exports = {
  getSoundexCode,
  generateSoundex,
};
