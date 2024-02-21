const express = require('express');
const router = express.Router();
const db = require('../../db/config'); // Adjust the path based on your project structure

// Endpoint to handle form submission and store data in tblproblem
router.get('/symptoms', (req, res) => {
    const sql = `
        SELECT a.*, b.symptomsId, b.symptomDesc, b.response
        FROM tblsolution AS a
        INNER JOIN tblsymptoms AS b ON b.symptomsId = a.symptomsId
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Group solutions by symptomsId
            const groupedData = {};
            result.forEach((row) => {
                const key = row.symptomsId;
                if (!groupedData[key]) {
                    groupedData[key] = {
                        id: row.symptomsId,
                        issue: row.symptomDesc,
                        solutions: [],
                        response: row.response,

                    };
                }
                groupedData[key].solutions.push(row.solution.toString());
            });

            // Convert groupedData object to an array
            const formattedData = Object.values(groupedData);

            console.log('Data retrieved successfully:', formattedData);
            res.status(200).json(formattedData);
        }
    });
});

module.exports = router;
