const express = require('express');
const { getAllCountries } = require('../controllers/country-controller')

const country_router = express.Router();

country_router.get("/getAllCountries", getAllCountries);

module.exports = country_router;
