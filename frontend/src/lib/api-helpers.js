import { API_URL } from '../lib/consts.js';

async function getModel(url) {
  const res = await fetch(url, {
    headers: { 'Accept': 'application/vnd.api+json' }
  });
  const json = await res.json();

  if (!json?.data?.id)
    return null;

  return {
    id: json.data.id,
    ...json.data.attributes
  }
}

export async function getSong(id) {
  return getModel(`${API_URL}/songs/${id}`)
}


export async function getArtist(id) {
  return getModel(`${API_URL}/artists/${id}`)
}

export async function getCountry(code) {
  return getModel(`${API_URL}/countries/${code}`)
}

async function getModels(url) {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.api+json" },
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    return null
  }
  if (!json?.data) return null;


  const data = json.data.map((model) => ({
    id: model.id,
    ...model.attributes,
  }));

  return {
    data, total: json.meta.total
  }
}

function gteFilter(fieldName, value) {
  return { name: fieldName, op: "gte", val: value };
}

function textSearch(fieldName, text) {
  return { name: fieldName, op: "ilike", val: text ? `%${text}%` : null };
}

export async function getSongs({
  search,
  sort,
  page,

  genres,
  listensGreaterThan,
  profanityToxicGreaterThan,
  profanitySexuallyExplictGreaterThan,
  profanityProfanityGreaterThan,
  profanityIdentityAttackGreaterThan,
}) {
  let filters = [];

  filters.push({ name: "genre", op: "in", val: genres });


  // if (countryCodes) throw new Error('not implemented');
  // if (countryNameSearch) throw new Error('not implemented');

  filters.push(gteFilter("views", listensGreaterThan));

  filters.push(gteFilter("profanity_toxicity", profanityToxicGreaterThan));
  filters.push(gteFilter("profanity_sexually_explicit", profanitySexuallyExplictGreaterThan));
  filters.push(gteFilter("profanity_profanity", profanityProfanityGreaterThan));
  filters.push(gteFilter("profanity_identity_attack", profanityIdentityAttackGreaterThan));

  filters.push(textSearch('search', search));

  filters = filters.filter((filter) => filter.val);
  filters = filters.filter((filter) => filter.val.length === undefined || filter.val.length !== 0);

  if (sort === 'listens') sort = 'views';
  if (!page) page = 0;

  const url = new URL(`${API_URL}/songs`);
  url.search = new URLSearchParams({
    'filter[objects]': JSON.stringify(filters),
    'page[number]': page + 1,
    sort: sort ? sort : '',
  }).toString();

  return getModels(url);
}

export async function getArtists({
  search,
  sort,
  page,

  genres,
  listensGreaterThan,
  followersGreaterThan,
  profanityToxicGreaterThan,
  profanitySexuallyExplictGreaterThan,
  profanityProfanityGreaterThan,
  profanityIdentityAttackGreaterThan,
}) {
  let filters = [];

  filters.push({ name: "genre", op: "in", val: genres });
  filters.push(gteFilter("views", listensGreaterThan));
  filters.push(gteFilter("followers", followersGreaterThan));

  filters.push(gteFilter("profanity_toxicity", profanityToxicGreaterThan));
  filters.push(gteFilter("profanity_sexually_explicit", profanitySexuallyExplictGreaterThan));
  filters.push(gteFilter("profanity_profanity", profanityProfanityGreaterThan));
  filters.push(gteFilter("profanity_identity_attack", profanityIdentityAttackGreaterThan));

  // search by name, top_track, genre
  filters.push(textSearch('search', search));

  filters = filters.filter((filter) => filter.val);
  filters = filters.filter((filter) => filter.val.length === undefined || filter.val.length !== 0);

  if (sort === 'listens') sort = 'views';

  if (!page) page = 0;

  const url = new URL(`${API_URL}/artists`);
  url.search = new URLSearchParams({
    'filter[objects]': JSON.stringify(filters),
    'page[number]': page + 1,
    sort: sort ? sort : '',
  }).toString();

  return getModels(url);
}

export async function getCountries({
  sort,
  page,
  search,

  regions,
  topArtists,
  profanityToxicGreaterThan,
  profanitySexuallyExplictGreaterThan,
  profanityProfanityGreaterThan,
  profanityIdentityAttackGreaterThan,
}) {

  let filters = [];

  filters.push({ name: "region", op: "in", val: regions });
  filters.push({ name: "top_artist", op: "in", val: topArtists });

  // search by name_official, region, top song, top artist
  filters.push(textSearch('search', search));

  filters.push(gteFilter("profanity_toxicity", profanityToxicGreaterThan));
  filters.push(gteFilter("profanity_sexually_explicit", profanitySexuallyExplictGreaterThan));
  filters.push(gteFilter("profanity_profanity", profanityProfanityGreaterThan));
  filters.push(gteFilter("profanity_identity_attack", profanityIdentityAttackGreaterThan));

  filters = filters.filter((filter) => filter.val);
  filters = filters.filter((filter) => filter.val.length === undefined || filter.val.length !== 0);

  if (!page) page = 0;

  const url = new URL(`${API_URL}/countries`);
  url.search = new URLSearchParams({
    'filter[objects]': JSON.stringify(filters),
    'page[number]': page + 1,
    sort: sort ? sort : '',
  }).toString();

  return getModels(url);
}
