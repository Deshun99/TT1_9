const Country = require('../model/Country'); // Adjust the path based on your project structure
const countriesList = require('countries-list');

const getCountriesData = () => {
    return Object.values(countriesList.countries).map(country => ({ name: country.name }));
};

const populateCountries = async () => {
    try {
        const existingCountries = await Country.find();

        // If there are no existing countries, proceed with deletion and insertion
        if (existingCountries.length === 0) {
            const countriesData = getCountriesData();
            await Country.insertMany(countriesData);

            console.log('Countries populated successfully.');
        } else {
            console.log('Countries already exist in the database. Skipping population.');
        }
    } catch (error) {
        console.error('Error populating countries:', error);
    }
};

module.exports = populateCountries;