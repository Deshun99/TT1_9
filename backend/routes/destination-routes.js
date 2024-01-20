const express = require("express");
const { getDestination, editDestination, deleteDestination } = require("../controllers/destination-controller");

const router = express.Router();

router.get("/getDestination", getDestination);
router.put("/editDestination", editDestination);
router.delete("/deleteDestination", deleteDestination);

module.exports = router;