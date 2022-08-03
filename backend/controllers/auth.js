const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "$alman";

const validationCreateUser = [
  body("name", "Enter a valid Name with more than 3 characters.").isLength({
    min: 3,
  }),
  body("email", "Enter a valid email. Email must include @ sign.").isEmail(),
  body("password", "Password must be atlease 8 characters.").isLength({
    min: 8,
  }),
];

const createUser = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if the user with same email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Duplicate email id." });
    }

    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // Check if the user with same email exists already
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please input correct details." });
    }

    const passwordCompare = bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please input correct details." });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    return res.json({ authToken });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

const validationLoginUser = [
  body("email", "Enter a valid email. Email must include @ sign.").isEmail(),
  body("password", "Password cannot be blank.").exists(),
];

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

module.exports = {
  createUser,
  validationCreateUser,
  loginUser,
  validationLoginUser,
  getUser
};
