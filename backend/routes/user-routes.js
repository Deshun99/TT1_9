const express = require('express');
const { signup } = require('../controllers/user-controller')

const user_router = express.Router();

user_router.post("/signup", signup);

module.exports = user_router;
