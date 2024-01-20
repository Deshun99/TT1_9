const express = require("express");
const { getDestination, editDestination, deleteDestination } = require("../controllers/destination-controller");

const router = express.Router();

router.post("/getDestination", getDestination);
router.post("/editDestination", editDestination);
router.post("/deleteDestination", deleteDestination);

module.exports = router;