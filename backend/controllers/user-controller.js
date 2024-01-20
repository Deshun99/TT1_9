const User = require('../model/User');
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
    const { first_name, last_name, password, username } = req.body;

    // Validate password length
    if (password.length > 20) {
        return res.status(400).json({ error: 'Password must be at most 20 characters long.' });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ username });
    } catch (err) {
        console.log(err);
    }

    if (existingUser) {
        return res.status(400).json({ message: "User already exists." })
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
        return res.status(500).json({ error: 'Error registering user.' });
    }
    return res.status(201).json({ message: user })
}

const findUser = async (req, res) => {
  const destinations = await User.find();
  return res.status(201).json(destinations);
};

exports.findUser = findUser;
exports.signup = signup;