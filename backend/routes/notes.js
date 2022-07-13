const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        id: 1,
        name: "John"
    };

    res.json(obj);
})

module.exports = router