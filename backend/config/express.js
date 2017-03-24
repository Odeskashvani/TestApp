'use strict';
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var glob = require('glob');
var path = require('path');
var passport = require('passport');
var config = require('./config');
var cors = require('cors');
var consolidate = require('consolidate');

module.exports = function (db) {
	var app = express();
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.use(cors());
	// Should be placed before express.static
	app.use(compress({
		filter: function (req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));
	// Showing stack errors
	app.set('showStackError', true);
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	app.use(methodOverride());
	app.use(morgan('dev'));

	// Initialize passport for use
	app.use(passport.initialize());
	//Set view Engine
	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');

	// Bootstrap passport config
	require('./passport')(passport);

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function (routePath) {
		require(path.resolve(routePath))(app);
	});


	// Return Express server instance
	return app;
};