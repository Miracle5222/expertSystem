const express = require('express');
const router = express.Router();
const db = require('../../db/config'); // Adjust the path based on your project structure

// Endpoint to handle form submission and store data in tblproblem
router.post('/problemRoute', (req, res) => {
    console.log(req.body);
    const { problem, problemType } = req.body;

    // Assuming you have a table named tblproblem with columns rule, problemType
    const sql = 'INSERT INTO tblproblem (rule, problemType) VALUES (?, ?)';
    const values = [problem, problemType];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Data inserted successfully:', result);
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    });
});
router.get('/problemRoute', (req, res) => {
    const sql = 'SELECT * FROM tblproblem';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Format the result to resemble the desired structure
            const formattedData = result.map((row) => ({
                id: row.problemId,
                rule: row.rule,
                problemType: row.problemType,
                dateCreated: row.dateCreated.toISOString().split('T')[0],
            }));

            console.log('Data retrieved successfully:', formattedData);
            res.status(200).json(formattedData);
        }
    });
});
router.get("/sample", (req, res) => {
    res.send("this is sample")
})
module.exports = router;
