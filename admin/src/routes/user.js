const express = require('express');
const router = express.Router();

// Users route
router.get('/', (req, res) => {
    res.send('This is the users route!');
});

module.exports = router;
