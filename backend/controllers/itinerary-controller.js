const Itinerary = require('../model/Itinerary');
const ItineraryDestination = require('../model/ItineraryDestination');
const Destination = require('../model/Destination');
const Country = require('../model/Country');
const User = require('../model/User');

const createItinerary = async (req, res, next) => {
    const { userId, itineraryTitle, budget, countryId, destinations } = req.body;

    if (!userId || !itineraryTitle || !countryId) {
        return res.status(400).send("Missing fields!");
    }

    let currentItinerary = new Itinerary({
        user: User.findById(userId),
        country: Country.findById(countryId),
        budget,
        title: itineraryTitle
    });

    try {
        await currentItinerary.save();

        res.status(200).send({ message: "Success" });
    } catch (e) {

    }
}


// pass the entire destination object as well
const retrieveUserItineraries = async (req, res, next) => {
    const { userId } = req.body;

}

const updateItinerary = async (req, res, next) => {

}

const deleteItinerary = async (req, res, next) => {
    const { itineraryId } = req.body;

}

exports.createItinerary = createItinerary;
exports.retrieveUserItineraries = retrieveUserItineraries;
exports.deleteItinerary = deleteItinerary;
exports.updateItinerary = updateItinerary;