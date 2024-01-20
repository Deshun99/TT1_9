const Destination = require("../model/Destination");

const destination1 = async (req, res, next) => {
  const { first_name, last_name, password, username } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }
  // For security reasons, we do not store password in plain text
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    first_name,
    last_name,
    password: hashedPassword,
    username,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};

exports.destination = destination1;