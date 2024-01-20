const express = require('express');
const {
  createItinerary,
  retrieveUserItineraries,
  updateItinerary,
  retrieveItinerary,
  deleteItinerary,
  getListofItineraryBasedOnDestination,
  filterItineraryByCountry
} = require("../controllers/itinerary-controller");

const itinerary_router = express.Router();

itinerary_router.post('/create', createItinerary);
itinerary_router.get('/retrieveAll/:userId', retrieveUserItineraries);
itinerary_router.get('/retrieveSingular/:itineraryId', retrieveItinerary);
itinerary_router.delete('/delete/:itineraryId', deleteItinerary);
itinerary_router.put("/update/:id", updateItinerary);
itinerary_router.get("/getListBasedOnDestinationId/", getListofItineraryBasedOnDestination);
itinerary_router.get("/filterItineraryByCountry/:id", filterItineraryByCountry);

module.exports = itinerary_router;