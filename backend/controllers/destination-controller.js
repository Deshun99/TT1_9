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

exports.createDestination = createDestination;
