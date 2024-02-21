const express = require('express');
const router = express.Router();


const ProblemRoute = require("./adminRoutes/problemRoute")
const Symptoms = require("./adminRoutes/test")

router.use(ProblemRoute);
router.use(Symptoms);
// Users route
router.get('/', (req, res) => {
    res.send('This is the admin route!');
});

module.exports = router;
