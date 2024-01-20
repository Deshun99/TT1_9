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
    const { userId } = req.params;

    let itineraries;
    try {
        itineraries = await Itinerary.find({ user: userId });
    } catch (e) {
        console.log(e);
    }

    if (!itineraries) {
        res.status(400).send("User has no itineraries");
    }

    const consolidatedItineraries = [];
    for (let i = 0; i < itineraries.length; i++) {
        const itinerary = itineraries[i];
        const country = await Country.findById(itinerary.country);
        const itineraryDestinations = await ItineraryDestination.find({ itinerary_id: itinerary._id });

        const destinations = [];

        for (let j = 0; j < itineraryDestinations.length; j++) {
            const itineraryDestination = itineraryDestinations[j];
            const destinationDetails = await Destination.findById(itineraryDestination.destination_id);

            destinations.push(destinationDetails);
        }

        const consolidatedItinerary = {
            destinations,
            country,
            budget: itinerary.budget,
            title: itinerary.title,
        }

        consolidatedItineraries.push(consolidatedItinerary);
    }

    res.status(200).send({ itineraries: consolidatedItineraries });
}

// only adding and removing of destinations
const updateItinerary = async (req, res, next) => {

}

const deleteItinerary = async (req, res, next) => {
    const { itineraryId } = req.body;

}

async function deleteItineraryDestinations() {

}

exports.createItinerary = createItinerary;
exports.retrieveUserItineraries = retrieveUserItineraries;
exports.deleteItinerary = deleteItinerary;
exports.updateItinerary = updateItinerary;