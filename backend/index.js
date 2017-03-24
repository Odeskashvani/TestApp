'use strict';
/**
 * Module dependencies.
 */
var config = require('./config/config'),
	
	mongoose = require('mongoose'),//.promisifyAll(require('mongoose')),
	chalk = require('chalk');


//var options = { promiseLibrary: require('bluebird') };
/*var db = mongoose.createConnection(config.db);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('MongoDB connected');
});*/
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});
// Init the express application
var app = require('./config/express')(db);




// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('Sample Test backend app started on port ' + config.port);
