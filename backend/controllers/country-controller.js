const Country = require("../model/Country");

const getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find();
        res.status(200).json(countries);
    } catch (error) {
        console.error('Error fetching countries: ', error);
        res.status(500).json({ error: 'Error fetching countries.' });
    }
};

exports.getAllCountries = getAllCountries;