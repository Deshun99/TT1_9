const express = require('express');
const { createDestination, getDestination, editDestination, deleteDestination } = require('../controllers/destination-controller')

const dest_router = express.Router();

dest_router.post("/createdestination", createDestination);
dest_router.get("/getDestination", getDestination);
dest_router.put("/editDestination", editDestination);
dest_router.delete("/deleteDestination", deleteDestination);

module.exports = dest_router;
