/* eslint-disable */
const fetch = require('node-fetch')
const API_URL = 'http://localhost:5000/'

async function getModels(url) {
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.api+json' }
  })

  const json = await res.json()

  const data = json.data.map((model) => ({
    id: model.id,
    ...model.attributes
  }))

  return {
    data, total: json.meta.total
  }
}

async function getData(apiEndpoint, page = 0) {
  const url = new URL(`${API_URL}/${apiEndpoint}`)
  url.search = new URLSearchParams({
    'page[number]': page + 1
  }).toString()

  return getModels(url)
}

async function getAll(apiEndpoint) {
  const output = []

  let page = 0
  while (true) {
    const { data } = await getData(apiEndpoint, page)
    if (data.length === 0) { break }
    data.forEach(model => output.push(model))
    page++
  }

  return output
}

module.exports = getAll
