/* eslint-disable */
const fetch = require('node-fetch');

module.exports = async function getAll(modelName) {
  let numPages = 1;

  const data = [];

  for (let i = 0; i < numPages; i++) {
    const res = await fetch(`https://api.tuitionball.me/${modelName}?page=${i + 1}`)
    const json = await res.json();

    numPages = json.num_pages;
    json.data.forEach(model => data.push(model));
  }

  return data;
}