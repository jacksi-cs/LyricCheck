import fetch from 'node-fetch';
import chaiSorted from 'chai-sorted';
import { assert, expect } from 'chai';  // Using Assert style
import chai from 'chai';
import { getSongs, getArtists, getCountries } from './api-helpers.js';  // Using Assert style
chai.use(chaiSorted);

global.fetch = fetch;

function assertAllGreaterThan(list, n) {
  assert.deepEqual(
    list.filter(number => number < n),
    []
  );
}

function assertAllContainString(list, str) {
  assert.deepEqual(
    list.filter(text => !text.toLowerCase().includes(str)),
    []
  );
}

function assertAllListsContainString(listOfLists, str) {
  assert.deepEqual(
    listOfLists.filter(list => !list.includes(str)),
    []
  );
}

describe('song tests', function () {
  it('empty query not empty', async function () {
    const { data: songs } = await getSongs({});
    assert.notEqual(songs.length, 0);
  });

  it('empty query paginates', async function () {
    let { data: songsA } = await getSongs({});
    let { data: songsB } = await getSongs({ page: 1 });

    songsA = songsA.map(song => song.name);
    songsB = songsB.map(song => song.name);

    assert.deepEqual(
      songsA.filter((item, index) => songsA[index] === songsB[index]),
      []
    );
  });

  it('filters by genre', async function () {
    const { data: songs } = await getSongs({
      genres: ['pop', 'rock']
    });

    assert.deepEqual(
      songs
        .map(song => song.genre)
        .filter(genre => genre !== 'pop' && genre !== 'rock'),
      []
    );
  });
  it('filters by genre empty returns', async function () {
    const { data: songs } = await getSongs({
      genres: []
    });

    assert.notEqual(songs.length, 0);
  });

  it('filters by views', async function () {
    const { data: songs } = await getSongs({
      listensGreaterThan: 5000000
    });
    assertAllGreaterThan(songs.map(song => song.views), 5000000);
  });

  it('filters by profanity_toxicity', async function () {
    const { data: songs } = await getSongs({ profanityToxicGreaterThan: .8 });
    assertAllGreaterThan(songs.map(song => song.profanity_toxicity), .8);
  });
  it('filters by profanity_sexually_explicit', async function () {
    const { data: songs } = await getSongs({
      profanitySexuallyExplictGreaterThan: .8
    });
    assertAllGreaterThan(songs.map(song => song.profanity_sexually_explicit), .8);
  });
  it('filters by profanity_profanity', async function () {
    const { data: songs } = await getSongs({
      profanityProfanityGreaterThan: .8
    });
    assertAllGreaterThan(songs.map(song => song.profanity_profanity), .8);
  });
  it('filters by profanity_identity_attack', async function () {
    const { data: songs } = await getSongs({
      profanityIdentityAttackGreaterThan: .8
    });
    assertAllGreaterThan(songs.map(song => song.profanity_identity_attack), .8);
  });

  it.skip('filters by popular coutnries', async function () {
    const { data: songs } = await getSongs({
      countryCodes: ['ZA']
    });

    assert.includeMembers(songs.map(song => song.countries_popular_in), ['ZA']);
  });

  it('searches', async function () {
    const { data: songs } = await getSongs({
      search: 'christmas'
    });
    assert.notEqual(songs.length, 0);

    let reducedSongs = songs.filter(song => !song.name.toLowerCase().includes('christmas'));
    reducedSongs = reducedSongs.filter(song => !song.artist_name.toLowerCase().includes('christmas'));
    reducedSongs = reducedSongs.filter(song => !song.genre.toLowerCase().includes('christmas'));

    assert.equal(reducedSongs.length, 0);
  });
  it('searches if empty', async function () {
    const { data: songs } = await getSongs({
      search: ''
    });

    assert.notEqual(songs.length, 0);
  });

  // im not even gonna worry about this now
  it.skip('sorts by name', async function () {
    const { data: songs } = await getSongs({ search: 'b', sort: 'name' }); //filter out nonenglish names 
    expect(songs.map(song => song.name)).to.be.sorted();
  });

  it.skip('sorts by artist', async function () {
    const { data: songs } = await getSongs({ search: 'b', sort: 'artist_name' }); //filter out nonenglish names 
    expect(songs.map(song => song.artist_name)).to.be.sorted();
  });

  it.skip('sorts by album', async function () {
    const { data: songs } = await getSongs({ search: 'b', sort: 'album_name' }); //filter out nonenglish names 
    expect(songs.map(song => song.album_name)).to.be.sorted();
  });

  it('sorts by listens', async function () {
    const { data: songs } = await getSongs({ sort: 'listens' }); //filter out nonenglish names 
    expect(songs.map(song => song.views)).to.be.sorted();
  });

  it('sorts by genre', async function () {
    const { data: songs } = await getSongs({ sort: 'genre' }); //filter out nonenglish names 
    expect(songs.map(song => song.genre)).to.be.sorted();
  });
});

describe('artist tests', function () {
  it('empty query not empty', async function () {
    const { data: artists } = await getArtists({});
    assert.notEqual(artists.length, 0);
  });

  it('empty query paginates', async function () {
    let { data: artistsA } = await getArtists({});
    let { data: artistsB } = await getArtists({ page: 1 });

    artistsA = artistsA.map(artist => artist.name);
    artistsB = artistsB.map(artist => artist.name);

    assert.deepEqual(
      artistsA.filter((item, index) => artistsA[index] === artistsB[index]),
      []
    );
  });


  it('filters by genre', async function () {
    const { data: artists } = await getArtists({
      genres: ['pop', 'rock']
    });

    assert.deepEqual(
      artists
        .map(artist => artist.genre)
        .filter(genre => genre !== 'pop' && genre !== 'rock'),
      []
    );
  });


  it('filters by views', async function () {
    const { data: artists } = await getArtists({
      listensGreaterThan: 50000000
    });
    assertAllGreaterThan(artists.map(artist => artist.views), 50000000);
  });

  it('filters by followers', async function () {
    const { data: artists } = await getArtists({
      followersGreaterThan: 5000000
    });
    assertAllGreaterThan(artists.map(artist => artist.followers), 5000000);
  });

  it('filters by profanity_toxicity', async function () {
    const { data: artists } = await getArtists({
      profanityToxicGreaterThan: .8
    });
    assertAllGreaterThan(
      artists.map(artist => artist.profanity_toxicity), .8);
  });
  it('filters by profanity_sexually_explicit', async function () {
    const { data: artists } = await getArtists({
      profanitySexuallyExplictGreaterThan: .8
    });
    assertAllGreaterThan(
      artists.map(artist => artist.profanity_sexually_explicit), .8);
  });
  it('filters by profanity_profanity', async function () {
    const { data: artists } = await getArtists({
      profanityProfanityGreaterThan: .8
    });
    assertAllGreaterThan(
      artists.map(artist => artist.profanity_profanity), .8);
  });
  it('filters by profanity_identity_attack', async function () {
    const { data: artists } = await getArtists({
      profanityIdentityAttackGreaterThan: .8
    });
    assertAllGreaterThan(
      artists.map(artist => artist.profanity_identity_attack), .8);
  });

  it.skip('filters by country codes', async function () {
    const { data: artists } = await getArtists({
      countryCodes: ['HK']
    });

    assertAllListsContainString(
      artists.map(artist => artist.countries_popular_in),
      'HK'
    );
  });


  it('searches', async function () {
    const { data: artists } = await getArtists({
      search: 'christmas'
    });

    let reducedArtists = artists.filter(song => !song.name.toLowerCase().includes('christmas'));
    reducedArtists = reducedArtists.filter(song => !song.top_track.toLowerCase().includes('christmas'));
    reducedArtists = reducedArtists.filter(song => !song.genre.toLowerCase().includes('christmas'));

    assert.equal(reducedArtists.length, 0);
  });

  // again not worrying about this now
  it.skip('sorts by name', async function () {
    const { data: artists } = await getArtists({ nameSearch: 'f', sort: 'name' }); //filter out nonenglish names 

    // chai weirdness
    expect(artists.map(artist => artist.name.replace(/\s/g, '').toLowerCase())).to.be.sorted();
  });

  it('sorts by listens', async function () {
    const { data: artists } = await getArtists({ nameSearch: 'f', sort: 'listens' }); //filter out nonenglish names 

    expect(artists.map(artist => artist.views)).to.be.sorted();
  });

  it('sorts by followers', async function () {
    const { data: artists } = await getArtists({ nameSearch: 'f', sort: 'followers' }); //filter out nonenglish names 

    expect(artists.map(artist => artist.followers)).to.be.sorted();
  });


  it('sorts by profanity_average', async function () {
    const { data: artists } = await getArtists({ nameSearch: 'f', sort: 'profanity_average' }); //filter out nonenglish names 

    expect(artists.map(artist => artist.profanity_average)).to.be.sorted();
  });

  it('sorts by genre', async function () {
    const { data: artists } = await getArtists({ nameSearch: 'f', sort: 'genre' }); //filter out nonenglish names 

    expect(artists.map(artist => artist.genre.replace(/\s/g, '').toLowerCase())).to.be.sorted();
  });

  // not worry about this either
  it.skip('sorts by top track', async function () {
    const { data: artists } = await getArtists({ nameSearch: 'f', sort: 'top_track' }); //filter out nonenglish names 

    expect(artists.map(artist => artist.topTracks[0].replace(/\s/g, '').toLowerCase())).to.be.sorted();
  });
});


describe.only('countries tests', function () {
  it('empty query not empty', async function () {
    const { data: countries } = await getCountries({});
    assert.notEqual(countries.length, 0);
  });

  it('empty query paginates', async function () {
    let { data: countriesA } = await getCountries({});
    let { data: countriesB } = await getCountries({ page: 1 });

    countriesA = countriesA.map(country => country.name_common);
    countriesB = countriesB.map(country => country.name_common);

    assert.deepEqual(
      countriesA.filter((item, index) => countriesA[index] === countriesB[index]),
      []
    );
  });

  it('filters by region', async function () {
    const { data: countries } = await getCountries({
      regions: ['Antarctic', 'Americas']
    });

    assert.deepEqual(
      countries
        .map(country => country.region)
        .filter(region => region !== 'Antarctic' && region !== 'Americas'),
      []
    );
  });
  it('filters by top artists', async function () {
    const { data: countries } = await getCountries({
      topArtists: ['Ed Sheeran', 'The Weeknd']
    });

    assert.deepEqual(
      countries
        .map(country => country.top_artist)
        .filter(top_artist => top_artist !== 'Ed Sheeran' && top_artist !== 'The Weeknd'),
      []
    );
  });

  it('filters by profanity_toxicity', async function () {
    const { data: countries } = await getCountries({ profanityToxicGreaterThan: .8 });
    assertAllGreaterThan(countries.map(country => country.profanity_toxicity), .8);
  });
  it('filters by profanity_sexually_explicit', async function () {
    const { data: countries } = await getCountries({
      profanitySexuallyExplictGreaterThan: .8
    });
    assertAllGreaterThan(countries.map(country => country.profanity_sexually_explicit), .8);
  });
  it('filters by profanity_profanity', async function () {
    const { data: countries } = await getCountries({
      profanityProfanityGreaterThan: .8
    });
    assertAllGreaterThan(countries.map(country => country.profanity_profanity), .8);
  });
  it('filters by profanity_identity_attack', async function () {
    const { data: countries } = await getCountries({
      profanityIdentityAttackGreaterThan: .8
    });
    assertAllGreaterThan(countries.map(country => country.profanity_identity_attack), .8);
  });


  it('searches', async function () {
    const { data: countries } = await getCountries({
      search: 'the weeknd'
    });

    let reduced = countries.filter(country => !country.name_official.toLowerCase().includes('the weeknd'));
    reduced = reduced.filter(country => !country.region.toLowerCase().includes('the weeknd'));
    reduced = reduced.filter(country => !country.top_track.toLowerCase().includes('the weeknd'));
    reduced = reduced.filter(country => !country.top_artist.toLowerCase().includes('the weeknd'));

    assert.equal(reduced.length, 0);
  });



});