const express = require('express');
const { createItinerary } = require('../controllers/itinerary-controller');

const router = express.Router();

router.post('/itinerary', createItinerary);

module.exports = router;