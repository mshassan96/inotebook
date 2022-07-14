const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a user using: POST "api/auth/createuser". No Login Required

router.post('/createuser', [
    body('name', 'Enter a valid Name with more than 3 characters.').isLength({ min: 3 }),
    body('email', 'Enter a valid email. Email must include @ sign.').isEmail(),
    body('password', 'Password must be atlease 8 characters.').isLength({ min: 8 }),
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the user with same email exists already
        let user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(400).json({error: "Duplicate email id."})
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
    
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router