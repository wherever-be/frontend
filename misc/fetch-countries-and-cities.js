const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

(async () => {
  const airports = (await axios('https://www.ryanair.com/api/locate/v1/autocomplete/airports?phrase=&market=en-gb'))
    .data;

  const countries = airports
    .sort((a, b) => a.country.code.localeCompare(b.country.code))
    .reduce((obj, airport) => {
      obj[airport.country.code] = airport.country.name;
      return obj;
    }, {});

  const cities = airports
    .sort((a, b) => a.city.code.localeCompare(b.city.code))
    .reduce((obj, airport) => {
      obj[airport.city.code] = airport.city.name;
      return obj;
    }, {});

  await fs.writeJSON(path.join(__dirname, '../src/assets/i18n/locales/en-US/countries.json'), countries, { spaces: 2 });
  await fs.writeJSON(path.join(__dirname, '../src/assets/i18n/locales/en-US/cities.json'), cities, { spaces: 2 });
})();
