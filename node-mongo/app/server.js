// Configuring the database first
require('dotenv').config({ path: './.env' });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('./models/inventory.model.js');

const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('open', () => {
    console.log('Mongoose connection open');
});
mongoose.connection.on('error', (err) => {
    console.log('Connection error: ${err.message}');
});

// And create the server and port:
require('./routes/inventory.router.js')(app);
// Create a Server
const server = app.listen(8080, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("App listening at http://%s:%s", host, port)
});
