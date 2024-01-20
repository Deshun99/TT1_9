const express = require('express');
const { createItinerary, retrieveUserItineraries, updateItinerary } = require('../controllers/itinerary-controller');

const router = express.Router();

router.post('/create', createItinerary);
router.get('/retrieve/:userId', retrieveUserItineraries);

router.put("/update/:id", updateItinerary);

module.exports = router;