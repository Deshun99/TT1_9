const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  id: {
    type: Integer,
    required: true,
  },
  cost: {
    type: Float,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 6,
  },
  notes: {
    type: String,
    required: true,
    default: "user",
  },
});

module.exports = mongoose.model("Destination", destinationSchema);
