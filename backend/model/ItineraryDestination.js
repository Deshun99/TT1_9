const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itineraryDestinationSchema = new Schema({
    itinerary_id: {
        type: Schema.Types.ObjectId,
        ref: "Itinerary",
        required: true,
    },
    destination_id: {
        type: Schema.Types.ObjectId,
        ref: "Destination",
        required: true,
    },

});

module.exports = mongoose.model("ItineraryDestination", itineraryDestinationSchema);
