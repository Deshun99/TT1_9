const Itinerary = require('../model/Itinerary');
const ItineraryDestination = require('../model/ItineraryDestination');
const Destination = require('../model/Destination');
const Country = require('../model/Country');

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

const retrieveItinerary = async (req, res) => {
    const { itineraryId } = req.params;

    let itinerary;

    try {
        itinerary = Itinerary.findById(itineraryId);
    } catch (e) {
        res.status(400).send({ message: e });
    }

    const country = await Country.findById(itinerary.country);
    const itineraryDestinations = await ItineraryDestination.find({ itinerary_id: itinerary._id });

    const destinations = [];

    for (let i = 0; i < itineraryDestinations.length; i++) {
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

    res.status(200).send({ itinerary: consolidatedItinerary });
}

const updateItinerary = async (req, res) => {
    const findItinerary = await Itinerary.findById(req.params.id);

    if (!findItinerary) {
        return res.status(400).json({ message: "Itinerary id not found" });
    }

    const updateItinerary = await Destination.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    return res.status(201).json({ message: updateItinerary });
}

const getListofItineraryBasedOnDestination = async (req, res) => {
    try {
        const findDestinations = await ItineraryDestination.find({ destination_id: req.params.id });

        console.log(findDestinations);

        const listOfItineraries = [];
        for(let i = 0; i < findDestinations.length; i++) {
            console.log(findDestinations[0].itinerary_id);
            const itinerary = await Itinerary.findById(
              findDestinations[0].itinerary_id
            );
            listOfItineraries.push(itinerary);
        }
        
        return res.status(201).json({ message: listOfItineraries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Itinerary not deleted successfully." });
    }
}

const deleteItinerary = async (req, res) => {
    try {
        const findItinerary = await Itinerary.findById(req.params.itineraryId);

        if (!findItinerary) {
            return res.status(400).json({ message: "Itinerary id not found" });
        }

        const itineraryDestinations = findItinerary.itineraryDestination;

        for (let i = 0; i < itineraryDestinations.length; i++) {
            await ItineraryDestination.deleteOne({
                _id: itineraryDestinations[i]._id,
            });
        }

        await Itinerary.deleteOne({ _id: req.params.id });

        return res.status(201).json({ message: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Itinerary not deleted successfully." });
    }
}

exports.createItinerary = createItinerary;
exports.retrieveUserItineraries = retrieveUserItineraries;
exports.deleteItinerary = deleteItinerary;
exports.updateItinerary = updateItinerary;
exports.retrieveItinerary = retrieveItinerary;
exports.getListofItineraryBasedOnDestination =
  getListofItineraryBasedOnDestination;