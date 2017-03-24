'use strict';

module.exports = {
	app: {
		title: 'TestApp',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	templateEngine: 'swig',
	secret: 'MyS3cr3tK3Y',
	db: 'mongodb://localhost:27017/sampletest',
	port: process.env.PORT || 3002,
	
	CLIENT_URL: "http://localhost:4200"
};
