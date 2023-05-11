import dotenv from 'dotenv';
import * as fs from 'fs/promises';

dotenv.config('.env');

import pkg from 'pg';
const { Client } = pkg;

const client = new Client()
await client.connect();

const fileData = await fs.readFile('./country-model.txt');
const text = fileData.toString();

const countries = text
  .split('\n')
  .filter(line => line !== '')
  .map(JSON.parse);

for (const country of countries) {
  const topTracksIds = country.topTracks
    .map(track => track.id)
    .map(id => `'${id}'`)
    .join(',');
  const topTracksNames = country.topTracks
    .map(track => track.name)
    .map(str => str.replace(/\'/g, ""))
    .map(name => `'${name}'`).join(',');
  const topArtistsIds = country.topArtists
    .map(artist => artist.id)
    .map(id => `'${id}'`)
    .join(',');
  const topArtistsNames = country.topArtists
    .map(artist => artist.name)
    .map(str => str.replace(/\'/g, ""))
    .map(name => `'${name}'`).join(',');
  const continents = country.location.continents
    .map(continent => `'${continent}'`)
    .join(',');
  const languages = !country.location?.languages ? []
    : Object.values(country.location.languages)
      .map(language => `'${language}'`)
      .join(',');

  const insertQuery = `
    INSERT INTO countries (
      country_code,
      name_common,
      name_official,
      region,
      subregion,
      continents,
      languages,
      profanity_toxicity,
      profanity_identity_attack,
      profanity_profanity,
      profanity_sexually_explicit,
      top_tracks_ids,
      top_tracks_names,
      top_artists_ids,
      top_artists_names,
      flags_svg
    ) VALUES (
      $1, $2, $3, $4, $5,
      ARRAY[${continents}]::varchar(50)[],
      ARRAY[${languages}]::varchar(50)[],
      $6, $7, $8, $9,
      ARRAY[${topTracksIds}]::varchar(50)[],
      ARRAY[${topTracksNames}]::varchar(200)[],
      ARRAY[${topArtistsIds}]::varchar(50)[],
      ARRAY[${topArtistsNames}]::varchar(200)[],
      $10
    )
  `;

  const values = [
    country.name.code,
    country.name.common,
    country.name.official,
    country.location.region,
    country.location.subregion,
    country.profanityScore?.SEVERE_TOXICITY,
    country.profanityScore?.PROFANITY,
    country.profanityScore?.IDENTITY_ATTACK,
    country.profanityScore?.SEVERE_TOXICITY,
    country.media.flags.svg
  ];

  await client.query(insertQuery, values).catch((error) => {
    console.log(insertQuery, values);
    console.log(error);
  });
}

await client.end();
