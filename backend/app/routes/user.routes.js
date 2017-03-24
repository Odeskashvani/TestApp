'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    // User Routes
    var users = require('../../app/controllers/user.controller');
    app.route('/api/signup').post(users.signup);
    app.route('/api/signin').post(users.signin);
    app.route('/api/update').post(users.update);
      

};