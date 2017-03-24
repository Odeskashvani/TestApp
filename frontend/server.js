
var express = require('express');
var app = express();
var path = require('path');
var conf = require('./protractor.conf.js');

app.use('/',express.static(__dirname+'/dist'));

app.get('/*', function (req, res) {
res.sendFile(path.join(__dirname+'/dist','index.html'))
});

app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});

app.listen(conf.config.port, function () {
console.log('Example listening on port '+ ' ' + conf.config.port);
});

module.exports = app; 
