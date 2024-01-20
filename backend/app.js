const express = require('express');
const mongoose = require('mongoose')
const router = require('./routes/user-routes');

const app = express();
app.use(express.json());
app.use('/api', router);

mongoose.connect("mongodb+srv://admin:F55u19bSnV0I7xwo@techtrek.gbctebp.mongodb.net/mern-auth?retryWrites=true&w=majority").then(() => {
    app.listen(5000);
    console.log("Successfully connected to MongoDB! Listening to localhost 5000");
})
.catch((err) => console.log(err));