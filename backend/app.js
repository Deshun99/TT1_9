const express = require('express');
const mongoose = require('mongoose')
const user_router = require('./routes/user-routes');
const dest_router = require('./routes/destination-routes');
const cors = require("cors");
require("dotenv").config();

const app = express();
const Country = require('./model/Country');
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use('/user', user_router);
app.use('/destination', dest_router);

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@techtrek.gbctebp.mongodb.net/mern-auth?retryWrites=true&w=majority`).then(() => {
    app.listen(5000);
    console.log("Successfully connected to MongoDB! Listening to localhost 5000");
})
    .catch((err) => console.log(err));

// Populate countries
// Sample countries data
const countriesData = [
    { name: 'Singapore' },
    { name: 'Malaysia' },
    // Add more countries as needed
];

// Function to populate the countries in MongoDB
const populateCountries = async () => {
    try {
        // Clear existing data in the Country collection 
        await Country.deleteMany();

        // Insert the new countries data
        await Country.insertMany(countriesData);

        console.log('Countries populated successfully.');
    } catch (error) {
        console.error('Error populating countries:', error);
    }
};

// Call the function to populate countries
populateCountries();
