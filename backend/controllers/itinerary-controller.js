const Itinerary = require('../model/Itinerary');
const ItineraryDestination = require('../model/ItineraryDestination');
const Destination = require('../model/Destination');
const Country = require('../model/Country');
const User = require('../model/User');

const createItinerary = async (req, res, next) => {
    const { userId, itineraryTitle, budget, countryId, destinationIds } = req.body;

    if (!userId || !itineraryTitle || !countryId) {
        return res.status(400).send("Missing fields!");
    }

    let currentItinerary = new Itinerary({
        user: userId,
        country: countryId,
        budget,
        title: itineraryTitle
    });

    try {
        const itinerary = await currentItinerary.save();
        for (let i = 0; i < destinationIds.length; i++) {
            createItineraryDestination(itinerary._id, destinationIds[i]);
        }

        res.status(201).send({ message: itinerary });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e })
    }
}

async function createItineraryDestination(itinerary_id, destination_id) {
    const itineraryDestination = new ItineraryDestination({
        itinerary_id,
        destination_id,
    });

    try {
        await itineraryDestination.save();
    } catch (e) {
        return e
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