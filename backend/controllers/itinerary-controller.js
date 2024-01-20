const Itinerary = require('../model/Itinerary');
const ItineraryDestination = require('../model/ItineraryDestination');
const Destination = require('../model/Destination');
const Country = require('../model/Country');
const User = require('../model/User');

const createItinerary = async (req, res, next) => {
    const { userId, itineraryTitle, budget, country, destinations } = req.body;

    if (!country || !userId || !itineraryTitle) {
        return res.status(400).send("Missing fields!");
    }

    // this is the base itinerary
    let currentItinerary = new Itinerary(
        {
            user: userId,
            country: country.countryId,
            title: itineraryTitle,
            budget: budget,
        }
    )

    // transaction?
    try {
        const itinerary = currentItinerary.save();

        const id = itinerary._id;
        for (destination of destinations) {
            createItineraryDestination(id, destination);
        }

    } catch (e) {
        res.status(500).send({ message: itinerary });
    }
    res.status(201).send({ message: itinerary });
}

// private function for creation ItineraryDestinations
const createItineraryDestination = async (itineraryId, destination) => {
    let itineraryDestination = new ItineraryDestination({
        itinerary_id: itineraryId,
        destination: destination._id
    });

    itineraryDestination.save();
}

const retrieveUserItineraries = async (req, res, next) => {
    const { userId } = req.body;

}

const updateItinerary = async (req, res, next) => {

}

const deleteItinerary = async (req, res, next) => {
    const { itineraryId } = req.body;

}


modules.export = {
    createItinerary,
    retrieveUserItineraries,
    updateItinerary,
    deleteItinerary
}