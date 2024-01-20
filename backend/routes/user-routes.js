const express = require('express');
const { signup, findUser } = require('../controllers/user-controller')

const router = express.Router();

router.post("/signup", signup);
router.get("/findUser", findUser);

module.exports = router;