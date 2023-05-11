import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//scuffed dotenvs
dotenv.config({ path: path.join(__dirname, '.env') });

import LineByLineReader from "line-by-line";
import fetch from "node-fetch";
import Musixmatch from "musixmatch-node";
import Perspective from "perspective-api-client";
import SpotifyWebApi from 'spotify-web-api-node';

const LASTFM_URL = "http://ws.audioscrobbler.com/2.0";
const LASTFM_KEY = process.env.LASTFM_KEY;
const mxm = new Musixmatch(process.env.MUSICMATCH_KEY);
const perspective = new Perspective({ apiKey: process.env.PERSPECTIVE_KEY });

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET
});
const tokenRes = await spotifyApi.clientCredentialsGrant();
const token = tokenRes.body.access_token;
spotifyApi.setAccessToken(token);

const rl = new LineByLineReader(process.stdin);
process.stdout.on("error", function (err) { });

rl.on("line", async function (line) {
  const country = JSON.parse(line);
  rl.pause();
  for (const song of country.topTracks) {
    await onSong(song, country);
  }
  rl.resume();
});

rl.on('end', function () {
  for (const id in songs) {
    songs[id].countriesPopularIn = Array.from(songs[id].countriesPopularIn);
    console.log(JSON.stringify(songs[id]));
  }
});


async function getToxicity(lyrics) {
  try {
    const toxicScore = await perspective.analyze(lyrics, {
      attributes: [
        "SEVERE_TOXICITY",
        "IDENTITY_ATTACK",
        "SEXUALLY_EXPLICIT",
        "PROFANITY",
      ],
    });

    let out = {};

    Object.keys(toxicScore.attributeScores).forEach((attribute) => {
      out[attribute] = toxicScore.attributeScores[attribute].summaryScore.value;
    });
    return out;
  } catch (e) {
    // console.log(e);
    return null;
  }
}

const songs = {};
let count = 0;

async function onSong(song, country) {
  console.log(count++);
  if (songs[song.id]) {
    songs[song.id].countriesPopularIn.add(country.name.code);
    return;
  }

  await new Promise((r) => setTimeout(r, 500));

  const res = await fetch(
    `${LASTFM_URL}/?method=track.getInfo` +
    `&mbid=${song.id}` +
    `&api_key=${LASTFM_KEY}&format=json`
  );
  const { track } = await res.json();

  if (track == null) return;

  const spotifyData = await spotifyApi
    .searchTracks(`track:${song.name} artist:${track.artist?.name}`);
  const spotifyTrack = spotifyData.body.tracks.items[0];

  const lyricsRes = await mxm.getLyricsMatcher({
    q_track: song.name.toLowerCase(),
    q_artist: track.artist?.name.toLowerCase()
  });

  let lyrics = lyricsRes.message.body.lyrics?.lyrics_body;
  lyrics = lyrics?.substring(0, lyrics.length - 59);

  let songModel = {
    ...song,
    spotifyId: spotifyTrack?.id,
    artist: {
      name: track.artist?.name,
      id: track.artist?.mbid,
      spotifyId: spotifyTrack?.artists[0].id
    },
    views: track.playcount,
    genres: track.toptags.tag.map((tag) => tag.name),
    album: {
      name: track?.album?.title,
      id: track?.album?.mbid,
    },
    profanityScore: lyrics ? await getToxicity(lyrics) : null,
    lyrics,
    description: {
      summary: track.wiki?.summary,
      content: track.wiki?.content,
    },
    media: {
      image: spotifyTrack?.album.images[0],
      spotifyURI: spotifyTrack?.uri
    },
    countriesPopularIn: new Set()
  };
  songModel.countriesPopularIn.add(country.name.code);

  songs[song.id] = songModel;
  // console.log(JSON.stringify(songModel));
}
