const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'expertSystem',
};

const db = mysql.createConnection(dbConfig);

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = db;
