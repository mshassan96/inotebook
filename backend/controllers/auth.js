const User = require("../models/User");
// CURRENTLY WORKING ON THE FILE
const createUser = [];
const loginUser = [];
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

module.exports = { createUser, loginUser, getUser };
