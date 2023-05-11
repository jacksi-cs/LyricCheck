/* eslint-disable */
const getAll = require('./get-all-models');


async function main() {
  const schools = await getAll('schools');

  const tuitionWins = schools.map(school => ({
    tuition: school.tuition,
    wins: school.wins
  }));

  console.log(JSON.stringify(tuitionWins));
}

main();
