import dotenv from 'dotenv';
import * as fs from 'fs/promises';
import cliProgress from 'cli-progress';

dotenv.config('.env');

import pkg from 'pg';
const { Client } = pkg;

const client = new Client()
await client.connect();

const fileData = await fs.readFile('./artist-model.txt');
const text = fileData.toString();

const artists = text
  .split('\n')
  .filter(line => line !== '')
  .map(JSON.parse);

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar1.start(artists.length, 0);

for (const artist of artists) {
  const topTrackIds = artist.topTracks
    .map(track => track.id)
    .map(str => str?.replace(/\'/g, ""))
    .map(id => `'${id}'`).join(',');
  const topTrackNames = artist.topTracks
    .map(track => track.name)
    .map(str => str?.replace(/\'/g, ""))
    .map(name => `'${name}'`).join(',');
  const similarArtists = artist.similar
    .map(str => str?.replace(/\'/g, ""))
    .map(name => `'${name}'`)
    .join(',');

  const insertQuery = `
    INSERT INTO artists (
      id,
      name,
      genre,
      top_tracks_ids,
      top_tracks_names,
      similar_artists,
      countries_popular_in,
      views,
      followers,
      popularity,
      profanity_toxicity,
      profanity_profanity,
      profanity_identity_attack,
      profanity_sexually_explicit,
      image_url,
      spotify_uri,
      bio_summary,
      bio_content
    ) VALUES (
      $1, $2, $3,
      ARRAY[${topTrackIds}]::varchar(50)[],
      ARRAY[${topTrackNames}]::varchar(100)[],
      ARRAY[${similarArtists}]::varchar(50)[],
      ARRAY[${artist.countriesPopularIn.map(code => `'${code}'`).join(',')}]::varchar(2)[],
      $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14
    )
  `;

  const values = [
    artist.id,
    artist.name,
    artist.genres ? artist.genres[0] : null,
    artist.stats?.views,
    artist.stats?.followers,
    artist.stats?.popularity,
    artist.profanityScore?.SEVERE_TOXICITY,
    artist.profanityScore?.PROFANITY,
    artist.profanityScore?.IDENTITY_ATTACK,
    artist.profanityScore?.SEVERE_TOXICITY,
    artist.media?.image?.url,
    artist.media?.spotifyURI,
    artist.bio?.summary,
    artist.bio?.content
  ];

  // console.log(insertQuery, values);

  bar1.update(1);
  await client.query(insertQuery, values).catch(console.error);
}

bar1.stop();
await client.end();