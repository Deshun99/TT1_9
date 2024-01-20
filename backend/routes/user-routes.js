const express = require('express');
const { signup, login, findUsers } = require("../controllers/user-controller");

const user_router = express.Router();

user_router.post("/signup", signup);
user_router.post("/signup", signup);
user_router.post("/login", login);
// user_router.get("/user", verifyToken, getUser);
// user_router.get("/refresh", refreshToken, verifyToken, getUser);
// user_router.post("/logout", verifyToken, logout);
user_router.get("/findUsers", findUsers);

module.exports = user_router;
