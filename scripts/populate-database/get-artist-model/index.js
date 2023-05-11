import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//scuffed dotenvs
dotenv.config({ path: path.join(__dirname, '.env') });

import LineByLineReader from "line-by-line";
import SpotifyWebApi from 'spotify-web-api-node';
import fetch from "node-fetch";

const LASTFM_URL = "http://ws.audioscrobbler.com/2.0";
const LASTFM_KEY = process.env.LASTFM_KEY;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET
});
const tokenRes = await spotifyApi.clientCredentialsGrant();
spotifyApi.setAccessToken(tokenRes.body.access_token);

const rl = new LineByLineReader(process.stdin);
process.stdout.on("error", function (err) { });

rl.on("line", async function (line) {
  const country = JSON.parse(line);
  rl.pause();
  for (const artist of country.topArtists) {
    await onArtist(artist, country);
  }
  rl.resume();
});

rl.on('end', function () {
  for (const id in artists) {
    artists[id].countriesPopularIn = Array.from(artists[id].countriesPopularIn);
    console.log(JSON.stringify(artists[id]));
  }
});

const artists = {};

let count = 0;

async function onArtist(artist, country) {
  console.log(count++);
  if (artists[artist.id]) {
    artists[artist.id].countriesPopularIn.add(country.name.code);
    return;
  }

  await new Promise((r) => setTimeout(r, 100));

  const artistDataRes = await fetch(
    `${LASTFM_URL}/?method=artist.getInfo` +
    `&mbid=${artist.id}` +
    `&api_key=${LASTFM_KEY}&format=json`
  );
  const { artist: artistData } = await artistDataRes.json();

  if (!artistData) return;

  const spotifyData = await spotifyApi.searchArtists(artist.name);
  const spotifyArtist = spotifyData.body.artists.items[0];

  const topTracksRes = await fetch(
    `${LASTFM_URL}/?method=artist.getTopTracks` +
    `&mbid=${artist.id}` +
    `&api_key=${LASTFM_KEY}&format=json`
  );
  const { toptracks } = await topTracksRes.json();

  const artistModel = {
    ...artist,
    stats: {
      views: artistData.stats.playcount,
      followers: spotifyArtist.followers.total,
      popularity: spotifyArtist.popularity
    },
    similar: artistData.similar.artist.map((artist) => artist.name),
    genres: artistData.tags.tag.map((tag) => tag.name),
    media: {
      image: spotifyArtist.images[0],
      spotifyURI: spotifyArtist.uri
    },
    bio: {
      summary: artistData.bio?.summary,
      content: artistData.bio?.content,
    },
    topTracks: toptracks?.track.map((track) => ({
      name: track.name,
      id: track.mbid,
    })),
    countriesPopularIn: new Set()
  };
  artistModel.countriesPopularIn.add(country.name.code);

  artists[artist.id] = artistModel;

  // console.log(JSON.stringify(artistModel));
}
