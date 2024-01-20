const express = require('express');
const { createItinerary, retrieveUserItineraries } = require('../controllers/itinerary-controller');

const router = express.Router();

router.post('/create', createItinerary);
router.get('/retrieve/:userId', retrieveUserItineraries);

module.exports = router;