import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//scuffed dotenvs
dotenv.config({ path: path.join(__dirname, '.env') });

import LineByLineReader from "line-by-line";
import fetch from "node-fetch";

const rl = new LineByLineReader(process.stdin);
process.stdout.on("error", function (err) { });

const lastfmURL = "http://ws.audioscrobbler.com/2.0";
const LASTFM_KEY = process.env.LASTFM_KEY;

rl.on("line", async function (line) {
  const country = JSON.parse(line);
  rl.pause();
  onCountry(country);
  await new Promise((r) => setTimeout(r, 1000));
  rl.resume();
});


async function onCountry(country) {
  const tracksRes = await fetch(
    `${lastfmURL}/?method=geo.gettoptracks` +
    `&country=${country.name.common}` +
    `&api_key=${LASTFM_KEY}&format=json`
  );
  let tracks = await tracksRes.json().then((obj) => obj?.tracks?.track);
  if (!tracks) return;

  tracks = tracks.map((track) => ({
    name: track.name,
    id: track.mbid,
  }));

  const artistsRes = await fetch(
    `${lastfmURL}/?method=geo.gettopartists` +
    `&country=${country.name.common}` +
    `&api_key=${LASTFM_KEY}&format=json`
  );

  let artists = await artistsRes.json().then((obj) => obj.topartists.artist);
  artists = artists.map((artist) => ({
    name: artist.name,
    id: artist.mbid,
  }));

  country.topTracks = tracks;
  country.topArtists = artists;

  console.log(JSON.stringify(country));
}
