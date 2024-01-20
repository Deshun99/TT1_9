const express = require('express');
const {
  createItinerary,
  updateItinerary,
} = require("../controllers/itinerary-controller");

const router = express.Router();

router.post('/create', createItinerary);

router.put("update/:id", updateItinerary);

module.exports = router;