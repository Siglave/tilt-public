var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config.js');
var User = require('../models/userModel');
var createError = require("http-errors");
var nodemailer = require('nodemailer');

// Handle Registration
exports.register = async function (req, res, next) {
	var user = req.body.user;

	if (user.password.length < 5) {
		var errors = {
			password: {
				message: 'Le mot de passe doit contenir au moins 6 caractères',
				name: 'ValidationError',
				path: 'password'
			}
		};
		next(createError(500, "msg", { name: 'ValidationError', errors: errors }));
		return;

	} else {
		User.find({ pseudo: user.pseudo }, async function (err, docs) {
			if (err) {
				next(createError(500, "msg", { name: 'findError' }));
				return;
			}
			if (docs.length > 0) {
				var errors = {
					pseudo: {
						message: 'Ce Pseudo existe déjà.',
						name: 'ValidationError',
						path: 'pseudo'
					}
				};
				next(createError(500, "ValidationError", { name: 'ValidationError', errors: errors }));
				return;
			}

			var hashedPassword = bcrypt.hashSync(user.password, 8);

			var userInfo = {
				pseudo: user.pseudo,
				email: user.email,
				password: hashedPassword
			}
			try {
				var userCreated = await (new User(userInfo)).save();
			} catch (e) {
				next(createError(500, "msg", e));
				return;
			}
			var token = jwt.sign(
				{
					id: userCreated._id
				},
				config.secret,
				{
					expiresIn: config.tokenExpire // expires in 24 hours
				}
			);

			return res.status(200).send({
				auth: true,
				token: token,
				user: {
					_id: userCreated._id,
					pseudo: userCreated.pseudo,
					email: userCreated.email,
					roles: userCreated.roles,
					description: userCreated.description,
					follows: userCreated.follows,
					followers: userCreated.followers,
					votePosts: userCreated.votePosts,
					discussions: userCreated.discussions,
					isAdmin: userCreated.isAdmin
				}
			});

		});
	}
};

// Handle Login
exports.login = function (req, res, next) {
	//  Login with pseudo
	User.findOne({
		pseudo: req.body.user.pseudo
	})
		.populate({
			path: 'discussions',
			model: 'Discussion'
		})
		.select("+refreshToken +password")
		.exec(function (err, user) {
			if (err) {
				next(createError(500, "msg", err));
				return;
			}
			if (!user) {
				var errors = {
					password: {
						message: 'Pseudo ou mot de passe invalide.',
						name: 'ValidationError',
						path: 'password'
					}
				};
				next(createError(500, "ValidationError", { name: 'ValidationError', errors: errors }));
				return;
			}
			// Check if password is valid
			var passwordIsValid = bcrypt.compareSync(req.body.user.password, user.password);

			if (!passwordIsValid) {
				var errors = {
					password: {
						message: 'Pseudo ou mot de passe invalide.',
						name: 'ValidationError',
						path: 'password'
					}
				};
				next(createError(500, "ValidationError", { name: 'ValidationError', errors: errors }));
				return;
			}
			var token = jwt.sign(
				{
					id: user._id
				},
				config.secret,
				{
					expiresIn: config.tokenExpire // expires in 24 hours
				}
			);

			res.status(200).send({
				token: token,
				user: user
			});

		});
};

// Logout
exports.logout = function (req, res) {
	res.status(200).send({
		auth: false,
		token: null
	});
};


exports.verifyToken = function (req, res, next) {
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, x-access-token, Content-Type, Accept');

	var token = req.headers['x-access-token'];

	// No token
	if (!token) {
		next(createError(403, "No token provided.", { name: 'TokenError' }));
		return;
	}

	jwt.verify(token, config.secret, function (err, decoded) {
		if (err) {
			next(createError(500, "TokenError", { ...err }));
			return;
		}
		// if everything good, save to request for use in other routes
		req.userId = decoded.id;
		next();
	});
};

exports.sendMailResetPassword = function (req, res, next) {
	var email = req.body.email;

	User.findOne({
		email: email
	}).exec(function (err, user) {
		if (err) {
			next(createError(500, "ServerError"));
			return;
		}
		if (!user) {

			var errors = {
				email: {
					message: 'Le mail ne correspond à aucun utilisateur',
					name: 'UniqueError',
					path: 'email'
				}
			}

			next(createError(500, "ValidationError", { errors: errors, name: 'ValidationError' }));
			return;

		}

		var resetPasswordToken = jwt.sign(
			{
				id: user.email
			},
			config.secretResetPasswordToken,
			{
				expiresIn: config.resetPasswordTokenExpire
			}
		);
		user.set({ resetPasswordToken: resetPasswordToken });
		user.save(function (err) {
			var html = null;
			if (config.devEnv) {
				html = "<p>Bonjour vous avez demandé une réinitialisation du mot de passe sur le site tilt</p><p>Si vous n'avez pas fait de demande, ignorez ce mail</p><p>Sinon rendez-vous sur : <br>" + config.clientUrlDev + "/changePassword/" +
					resetPasswordToken +
					'</p>'
			} else {
				html = "<p>Bonjour vous avez demandé une réinitialisation du mot de passe sur le site tilt</p><p>Si vous n'avez pas fait de demande, ignorez ce mail</p><p>Sinon rendez-vous sur : <br>" + config.clientUrlProd + "/changePassword/" +
					resetPasswordToken +
					'</p>'
			}

			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: config.email,
					pass: config.emailPassword
				}
			});

			var mailOptions = {
				from: config.email,
				to: email,
				subject: 'Sending Email using Node.js',
				html: html
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					next(createError(500, "EmailError",{...error}));
					return;
				} else {
					res.status(200).send({
						message: 'Mail envoyé'
					});
				}
			});
		});
	});
};

exports.changePassword = function (req, res, next) {
	var password = req.body.password;
	var token = req.body.token;
	if (token !== '') {
		User.findOne({
			resetPasswordToken: token
		}).exec(function (err, user) {
			if (err) {
				next(createError(500, "ServerError"));
				return;
			}
			if (!user) {
				var errors= {
					form: {
						message: 'Le lien est invalide, verifiez votre mail',
						name: 'InvalidToken'
					}
				}
				next(createError(401, "ValidationError", { errors: errors, name: 'ValidationError' }));
				return;
				
			}

			// Check if the token is not expire
			jwt.verify(token, config.secretResetPasswordToken, function (err, decoded) {
				if (err) {
					var errors = {
						form: {
							message: 'Le lien a expiré, vous devez obtenir un nouveau lien par mail',
							name: 'TokenExpired'
						}
					}
					next(createError(500, "ValidationError", { errors: errors, name: 'ValidationError' }));
					return;
				}
				if (password.length < 5) {
					var errors = {
						password: { message: 'Le mot de passe doit contenir au moins 6 caractères' },
						confirmPassword: { message: 'Le mot de passe doit contenir au moins 6 caractères' }
					};
					next(createError(500, "ValidationError", { name: 'ValidationError',errors: errors }));
					return;
				}
				//Set new password
				var hashedPassword = bcrypt.hashSync(password, 8);
				user.set({ resetPasswordToken: "" });
				user.set({ password: hashedPassword });
				user.save(function (err) {
					if (err) {
						next(createError(500, "ServerError"));
						return;
					}
					// Save new Password
					res.status(200).send({
						message: 'Password Changed'
					});
				});
			});
		});
	} else {
		var errors= {
			form: {
				message: 'Le lien est invalide, verifiez votre mail',
				name: 'InvalidToken'
			}
		}
		next(createError(401, "ValidationError", { errors: errors, name: 'ValidationError' }));
		return;
	}
};
