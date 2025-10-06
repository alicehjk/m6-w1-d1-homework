// Configuring the database first
require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('./models/inventory.model.js');

const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect(process.env.DATABASE, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
});
mongoose.connection.on('open', () => {
    console.log('Mongoose connection open');
});
mongoose.connection.on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
    process.exit(1);
});

// And create the server and port:
require('./routes/inventory.router.js')(app);
// Create a Server
const server = app.listen(8080, function () {
    const address = server.address();
    if (address) {
        const host = address.address;
        const port = address.port;
        console.log("App listening at http://%s:%s", host, port);
    }
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error('Port 8080 is already in use');
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});
