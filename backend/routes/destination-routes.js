const express = require('express');
const { createDestination, getDestination, editDestination, deleteDestination, getAllDestinations } = require('../controllers/destination-controller')

const dest_router = express.Router();

dest_router.post("/createdestination", createDestination);
dest_router.get("/getDestination", getDestination);
dest_router.get("/getAllDestinations", getAllDestinations);
dest_router.put("/editDestination/:id", editDestination);
dest_router.delete("/deleteDestination/:id", deleteDestination);

module.exports = dest_router;
