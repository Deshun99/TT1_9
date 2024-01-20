const express = require('express');
const mongoose = require('mongoose')
const userRouter = require("./routes/user-routes");

const app = express();
app.use(express.json());
app.use("/api", userRouter);

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORORD}@cluster0.hes3x.mongodb.net/auth?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5001);
    console.log(
      "Successfully connected to MongoDB! Listening to localhost 5000"
    );
  })
  .catch((err) => console.log(err));