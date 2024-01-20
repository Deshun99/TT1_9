const express = require('express');
const { createDestination } = require('../controllers/destination-controller')

const dest_router = express.Router();

dest_router.post("/createdestination", createDestination);

module.exports = dest_router;