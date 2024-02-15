const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in 'routes' directory
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));
app.use('/admin', require('./routes/admin'));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
