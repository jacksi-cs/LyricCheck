/* eslint-disable */

const getAll = require('./get-all-models');

async function main() {
  const songs = await getAll('songs');

  const wordScores = {};

  songs.forEach(({ profanity_average, lyrics }) => {
    if (!lyrics) { return }

    const words = lyrics
      .toLowerCase()
      .replace(/\n/g, ' ')
      .replace(/[^a-z\s]+/g, '')
      .split(' ')
      .filter(word => word !== '');

    words.forEach(word => {
      if (!wordScores[word])
        wordScores[word] = { totalProfanity: 0, count: 0 }

      wordScores[word].totalProfanity += profanity_average;
      wordScores[word].count++;
    });
  });

  for (const word in wordScores) {
    wordScores[word] = wordScores[word].totalProfanity / wordScores[word].count;
  }

  console.log(JSON.stringify(wordScores));
}

main();
