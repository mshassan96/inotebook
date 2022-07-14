const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.post('/', (req, res) => {
    const notes = Notes(req.body);
    notes.save();
    res.send(req.body);
})

module.exports = router