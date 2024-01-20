const Destination = require("../model/Destination");

const destination = async (req, res, next) => {
  const { cost, name, notes, country } = req.body;
  // let existingUser;
  // try {
  //   existingUser = await Destination.findOne({ username });
  // } catch (err) {
  //   console.log(err);
  // }

  // if (existingUser) {
  //   return res.status(400).json({ message: "User already exists." });
  // }
  // For security reasons, we do not store password in plain text
  // const hashedPassword = bcrypt.hashSync(password);
  const destination = new Destination({
    cost,
    name,
    notes,
    country,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};

const getDestination = async (req, res) => {
  const destinations = await Destination.find();
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

  await Destination.remove();

  return res.status(201).json({ message: req.params.id });
};

exports.getDestination = getDestination;
exports.editDestination = editDestination;
exports.deleteDestination = deleteDestination;
exports.destination = destination;