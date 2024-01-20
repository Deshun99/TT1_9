const express = require('express');
const mongoose = require('mongoose')
const userRouter = require("./routes/user-routes");
const router = require('./routes/user-routes');
const destinationRoute = require("./routes/destination-routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/api", userRouter);
app.use("/destination", destinationRoute);

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@techtrek.gbctebp.mongodb.net/mern-auth?retryWrites=true&w=majority`).then(() => {
    app.listen(5000);
    console.log("Successfully connected to MongoDB! Listening to localhost 5000");
})
    .catch((err) => console.log(err));
