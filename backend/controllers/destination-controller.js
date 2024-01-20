const Destination = require("../model/Destination");
const Country = require("../model/Country");

const createDestination = async (req, res, next) => {
  const { cost, name, notes, country } = req.body;

  try {
    // Check if the country exists
    const countryName = await Country.findOne({ name: country });

    if (!countryName) {
      return res.status(400).json({ error: 'Country not found.' });
    }

    // Create a new destination with the country ID
    const destination = new Destination({
      cost,
      name,
      notes,
      country: countryName._id,
    });

    // Save the destination to the database
    await destination.save();

    res.status(201).json({ message: 'Destination added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding destination.' });
  }
};

const getDestination = async (req, res) => {
  const destinations = await Destination.find();

  for(destination of destinations) {
    destination.country = Country.findById(destination.country);
  }
  return res.status(201).json(destinations);
}

const editDestination = async (req, res) => {
  const findDestination = await Destination.findById(req.params.id);

  if (!findDestination) {
    return res.status(400).json({ message: "Destination id not found" });
  }

  const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  return res.status(201).json({ message: updatedDestination });
}

const deleteDestination = async (req, res, next) => {
  const findDestination = await Destination.findById(req.params.id);

  if (!findDestination) {
    return res.status(400).json({ message: "Destination id not found" });
  }

  await Destination.deleteOne({ _id: req.params.id });

  return res.status(201).json({ message: req.params.id });
};

const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().populate('country');
    res.status(200).json(destinations);
  } catch (error) {
    console.error('Error fetching destinations: ', error);
    res.status(500).json({ error: 'Error fetching destinations.' });
  }
};

exports.createDestination = createDestination;
exports.getDestination = getDestination;
exports.editDestination = editDestination;
exports.deleteDestination = deleteDestination;
exports.getAllDestinations = getAllDestinations;