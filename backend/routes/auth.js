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

// ROUTE 1: Create a user using: POST "api/auth/user". No Login Required
router.post("/user", validationCreateUser, createUser);

// ROUTE 2: Get logged in user details: POST "api/auth/user". Login Required
router.get("/user", fetchuser, getUser);

// ROUTE 3: Authenticate a user using: POST "api/auth/login". No Login Required
router.post("/login", validationLoginUser, loginUser);

module.exports = router;
