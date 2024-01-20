const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  cost: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length <= 50;
      },
      message: "name must be at most 50 characters long.",
    },
  },
  notes: {
    type: String,
    required: true,
    default: "user",
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
    required: true,
  },
});

module.exports = mongoose.model("Destination", destinationSchema);
