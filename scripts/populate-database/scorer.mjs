import { promises as fs } from "fs";

async function readFile(file) {
  const fileData = await fs.readFile(file).then((res) => res.toString());

  const arr = fileData
    .split('\n')
    .filter((str) => str.trim() !== '')
    .map((str) => JSON.parse(str));

  return arr;
}

async function getSongRatings() {
  const songs = await readFile("./song-model.txt");

  const songRatings = {};

  for (const song of songs) {
    songRatings[song.id] = song.profanityScore;
  }

  return songRatings;
}

const songRatings = await getSongRatings();

function getRating(obj) {
  const topTracks = obj.topTracks;
  let numSongs = 0;
  const totalProfanity = {
    SEVERE_TOXICITY: 0,
    PROFANITY: 0,
    SEXUALLY_EXPLICIT: 0,
    IDENTITY_ATTACK: 0,
  };
  for (const { id } of topTracks) {
    const songRating = songRatings[id];
    if (songRating) {
      numSongs++;
      totalProfanity.SEVERE_TOXICITY += songRating.SEVERE_TOXICITY;
      totalProfanity.PROFANITY += songRating.PROFANITY;
      totalProfanity.SEXUALLY_EXPLICIT += songRating.SEXUALLY_EXPLICIT;
      totalProfanity.IDENTITY_ATTACK += songRating.IDENTITY_ATTACK;
    }
  }
  if (numSongs === 0) return null;

  totalProfanity.SEVERE_TOXICITY /= numSongs;
  totalProfanity.PROFANITY /= numSongs;
  totalProfanity.SEXUALLY_EXPLICIT /= numSongs;
  totalProfanity.IDENTITY_ATTACK /= numSongs;

  totalProfanity.AVERAGE =
    (totalProfanity.SEVERE_TOXICITY +
      totalProfanity.PROFANITY +
      totalProfanity.SEXUALLY_EXPLICIT +
      totalProfanity.IDENTITY_ATTACK) /
    4;

  return totalProfanity;
}

const model = await readFile(process.argv[2]);
model.forEach((obj) => {
  obj.profanityScore = getRating(obj);
  return obj;
});
model.forEach((obj) => console.log(JSON.stringify(obj)));
