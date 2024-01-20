const User = require('../model/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Inavlid Username / Password" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "35s",
  });

  console.log("Generated Token\n", token);

//   if (req.cookies[`${existingUser._id}`]) {
//     req.cookies[`${existingUser._id}`] = "";
//   }

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30), // 30 seconds
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid TOken" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

exports.signup = signup;
// exports.logout = logout;
exports.login = login;
exports.verifyToken = verifyToken;
// exports.getUser = getUser;
// exports.refreshToken = refreshToken;