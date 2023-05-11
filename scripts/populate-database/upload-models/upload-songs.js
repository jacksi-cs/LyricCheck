import dotenv from 'dotenv';
import * as fs from 'fs/promises';

dotenv.config('.env');

import pkg from 'pg';
const { Client } = pkg;

const client = new Client()
await client.connect();

const fileData = await fs.readFile('./song-model.txt');
const text = fileData.toString();

const songs = text
  .split('\n')
  .filter(line => line !== '')
  .map(JSON.parse);

for (const song of songs) {
  const insertQuery = `
    INSERT INTO songs (
      id,
      spotify_id,
      name,
      artist_name,
      artist_id,
      artist_spotify_id,
      genre,
      album_name,
      album_id,
      countries_popular_in,
      views,
      profanity_toxicity,
      profanity_profanity,
      profanity_identity_attack,
      profanity_sexually_explicit,
      lyrics,
      description_summary,
      description_content,
      image_url,
      spotify_uri
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9,
      ARRAY[${song.countriesPopularIn.map(genre => `'${genre}'`).join(',')}],
      $10, $11, $12, $13, $14, $15, $16, $17,
      $18, $19
    )
  `;

  const values = [
    song.id,
    song.spotifyId,
    song.name,
    song.artist?.name,
    song.artist?.id,
    song.artist?.spotifyId,
    song.genres ? song.genres[0] : null,
    song.album?.name,
    song.album?.id,

    parseInt(song.views, 10),
    song.profanityScore?.SEVERE_TOXICITY,
    song.profanityScore?.PROFANITY,
    song.profanityScore?.IDENTITY_ATTACK,
    song.profanityScore?.SEVERE_TOXICITY,
    song.lyrics,
    song.description?.summary,
    song.description?.content,

    song.media?.image?.url,
    song.media?.spotifyURI
  ];

  await client.query(insertQuery, values).catch(console.error);

}

await client.end();