'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	crypto = require('crypto'),
	User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var config = require('../../config/config');



/** Signup*/
exports.signup = function (req, res) {
	if (!req.body.email || !req.body.password) {
		res.json({
			success: false,
			message: 'Please enter email and password.'
		});
	} else {
		User.findOne({
				email: req.body.email,
				password: req.body.password,
			},
			function (err, usr) {
				if (usr !== null) {
					res.json({
						success: false,
						message: 'Email already registered.'
					});
				} else {

					var newUser = new User({
						email: req.body.email,
						password: req.body.password,
						fullname: req.body.fullname

					});

					// Attempt to save the user
					newUser.save(function (err, usr) {
						if (err) {
							return res.json({
								success: false,
								message: 'That email address already exists.',
								error: err
							});
						}
						res.json({
							success: true,
							message: 'Successfully created new user.',
							userid: usr.id,
							email: usr.email
						});
					});
				}
			});
	}

};

/** Signin*/
exports.signin = function (req, res, next) {
	User.findOne({
		email: req.body.email
	}, function (err, user) {
		if (err) throw err;

		if (!user) {
			res.send({
				success: false,
				message: 'Authentication failed. User not found.'
			});
		} else {
			// Check if password matches
			user.comparePassword(req.body.password, function (err, isMatch) {
				if (isMatch && !err) {
					// Create token if the password matched and no error was thrown
					var token = jwt.sign(user, config.secret, {
						expiresIn: 3600000 // in seconds
					});
					res.json({
						success: true,
						token: 'JWT ' + token,
						userid: user._id,
						email: user.email,
						fullname: user.fullname
					});
				} else {
					res.send({
						success: false,
						message: 'Authentication failed. Passwords did not match.'
					});
				}
			});

		}
	});

};

/**Signout*/
exports.signout = function (req, res) {
	req.logout();
	res.redirect('/');
};

/** Update Profile */
exports.update = function (req, res) {

	User.findOne({
		_id: req.body.userdata.userid
	}, function (err, user) {
		if (err || !user) {
			res.status(500).json({
				success: false
			});
		} else {
			user.fullname = req.body.userdata.fullname;
			user.email = req.body.userdata.email;
			user.password = req.body.userdata.password;

			user.save(function (err) {
				if (err) {
					res.status(500).json({
						success: false
					});
				}
				res.status(201).json({
					success: true,
					token: req.body.userdata.token,
					userid: user._id,
					email: user.email,
					fullname: user.fullname
				});
			});

		}
	});
};