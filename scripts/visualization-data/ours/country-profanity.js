
const getAll = require('./get-all-models')

async function main () {
  const rawCountries = await getAll('countries')

  const formattedCountries = rawCountries.map(country => ({
    name: country.name_common,
    value: country.profanity_average
  }))

  console.log(JSON.stringify(formattedCountries))
}

main()
