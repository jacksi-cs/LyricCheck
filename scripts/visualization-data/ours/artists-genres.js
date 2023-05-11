/* eslint-disable */

const getAll = require('./get-all-models')

async function main() {
  const artists = await getAll('artists')

  const genresList = {}

  artists.forEach(({ genre, name }) => {
    if (!genresList[genre]) { genresList[genre] = 0 }
    genresList[genre]++
  })

  console.log(JSON.stringify(genresList))
}

main()
