const express = require('express');
const {
    createItinerary,
    retrieveUserItineraries,
    updateItinerary,
    retrieveItinerary,
    deleteItinerary,
} = require('../controllers/itinerary-controller');

const router = express.Router();

router.post('/create', createItinerary);
router.get('/retrieveAll/:userId', retrieveUserItineraries);
router.get('/retrieveSingular/:itineraryId', retrieveItinerary);
router.delete('/delete/:itineraryId', deleteItinerary);
router.put("/update/:id", updateItinerary);

module.exports = router;