const express = require('express');
const mongoose = require('mongoose')
const user_router = require('./routes/user-routes');
const dest_router = require('./routes/destination-routes');
const populateCountries = require('./utils/populateCountries');
const itinerary_router = require('./routes/itinerary-routes');
const country_router = require('./routes/country-routes');
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use('/user', user_router);
app.use('/destination', dest_router);
app.use("/itinerary", itinerary_router);
app.use("/country", country_router);

async function startServer() {
    try {
        await mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@techtrek.gbctebp.mongodb.net/mern-auth?retryWrites=true&w=majority`);
        console.log("Successfully connected to MongoDB!");

        await populateCountries();

        app.listen(5000, () => {
            console.log("Listening on http://localhost:5000");
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

// Start the server
startServer();

