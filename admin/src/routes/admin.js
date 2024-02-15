const express = require('express');
const router = express.Router();


const ProblemRoute = require("./adminRoutes/problemRoute")

router.use(ProblemRoute);


// Users route
router.get('/', (req, res) => {
    res.send('This is the admin route!');
});

module.exports = router;
