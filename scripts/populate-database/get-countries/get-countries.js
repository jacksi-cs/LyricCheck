import fetch from "node-fetch";

const res = await fetch(`https://restcountries.com/v3.1/all`);
let countries = await res.json();

countries = countries.map((country) => ({
  name: {
    common: country.name.common,
    official: country.name.official,
    code: country.cca2,
  },
  location: {
    region: country.region,
    subregion: country.subregion,
    languages: country.languages,
    continents: country.continents,
  },
  media: {
    maps: country.maps,
    flags: country.flags,
  },
}));

countries.forEach((country) => console.log(JSON.stringify(country)));
