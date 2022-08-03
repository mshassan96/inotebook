const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const {
  createUser,
  validationCreateUser,
  loginUser,
  validationLoginUser,
  getUser
} = require("../controllers/auth");

// ROUTE 1: Create a user using: POST "api/auth/createuser". No Login Required
router.post("/createuser", validationCreateUser, createUser);

// ROUTE 2: Authenticate a user using: POST "api/auth/login". No Login Required
router.post("/login", validationLoginUser, loginUser);

// ROUTE 3: Get logged in user details: POST "api/auth/getuser". Login Required
router.post("/getuser", fetchuser, getUser);

module.exports = router;
