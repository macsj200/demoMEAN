'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
    http = require('http'),
    https = require('https'),
    fs = require('fs');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
//app.listen(config.port);

// This line is from the Node.js HTTPS documentation.
var options = {
    key: fs.readFileSync('config/certs/server.key'),
    cert: fs.readFileSync('config/certs/server.crt')
};

https.createServer(options, app).listen(config.httpsPort);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);