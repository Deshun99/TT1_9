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

exports.destination = destination;