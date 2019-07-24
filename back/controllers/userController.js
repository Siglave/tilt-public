var mongoose = require("mongoose");
var User = require('../models/userModel');
var createError = require("http-errors");

exports.getUserToken = function(req, res) {
	var userId = req.userId;

	User.findById(userId)
	.populate({
		path: 'discussions',
		model: 'Discussion'
	})
	.exec(function(err, user) {
		if (err) {
			throw err;
		}
		return res.status(200).send({
			user: user
		});
	});
};
exports.getUserInfo = function(req, res, next) {
	var userId = req.userId;
	var pseudo = req.params.pseudo

	User.findOne({pseudo: pseudo})
	.populate({
		path: 'posts',
		model: 'Post'
	})
	.populate({
		path: 'posts',
		populate: { path: 'creator', model: 'User' }
	})
	.populate({
		path: 'discussions',
		model: 'Discussion'
	})
	.exec(function(err, user) {
		if (err) {
			next(createError(500, "msg", err));
			return;
		}
		if(user === null){
			next(createError(404, "User not Found"));
			return;
		}
		return res.status(200).send({
			user: user
		});
	});
};

exports.update = function(req, res, next){
	var userId = req.userId;
	var userToUpdate = req.body.user;
	
	User.findOneAndUpdate(
		{
			_id: userId
		},
		userToUpdate,
		{
			new: true,
			runValidators: true,
			useFindAndModify: false
		}
	)
	.exec(function(err, user){
		if (err) {
			var errors = {};
			if (err.name === 'MongoError' && err.code === 11000) {
				errors.pseudo = {
					message: 'Ce pseudo est déja utilisé',
					name: 'DuplicateError',
					path: 'pseudo'
				};
				next(createError(500, "ValidationError", { errors :errors, name: 'ValidationError'}));
				return;
			}else{
				next(createError(500, "ValidationError", { ...err}));
				return;
			}

		}
		return res.status(200).send({
			user: user,
			message: 'Profile updated'
		});
	})

}

exports.follow = function(req, res, next){
	var userId = req.userId;
	var userToFollowId = req.params.userId;

	User.findById(userId)
	.populate({
		path: 'posts',
		model: 'Post'
	})
	.populate({
		path: 'posts',
		populate: { path: 'creator', model: 'User' }
	})
	.exec( async function(err, user) {
		if (err) {
			next(createError(500, "msg", err));
			return;
		}

		user.follows.push(mongoose.Types.ObjectId(userToFollowId))
		await user.save();

		User.findById(userToFollowId)
		.exec( async function(err, userFollowed) {
			if (err) {
				next(createError(500, "msg", err));
				return;
			}
			userFollowed.followers.push(mongoose.Types.ObjectId(userId));
			await userFollowed.save();
			
			return res.status(200).send({
				user: user
			});
		});
	});
}

exports.unFollow = function(req, res, next){
	var userId = req.userId;
	var userToUnFollowId = req.params.userId;

	User.findById(userId)
	.populate({
		path: 'posts',
		model: 'Post'
	})
	.populate({
		path: 'posts',
		populate: { path: 'creator', model: 'User' }
	})
	.exec( async function(err, user) {
		if (err) {
			next(createError(500, "msg", err));
			return;
		}

		user.follows = user.follows.filter((u)=>{

			if(u.toString() !== userToUnFollowId.toString()){
				return u;
			}
		})
		await user.save();

		User.findById(userToUnFollowId)
		.exec( async function(err, userUnFollowed) {
			if (err) {
				next(createError(500, "msg", err));
				return;
			}
			userUnFollowed.followers = userUnFollowed.followers.filter((u)=>{
				if(u.toString() !== userId.toString()){
					return u;
				}
			})
			await userUnFollowed.save();
			
			return res.status(200).send({
				user: user
			});
		});
	});
}

exports.getFollows = function(req, res, next){
	var userId = req.params.userId
	User.findById(userId)
	.populate({
		path: 'follows',
		model: 'User'
	})
	.exec( async function(err, user) {
		if (err) {
			next(createError(500, "msg", err));
			return;
		}

		return res.status(200).send({
			follows: user.follows
		});
	});

}
exports.getFollowers = function(req, res, next){
	var userId = req.params.userId
	User.findById(userId)
	.populate({
		path: 'followers',
		model: 'User'
	})
	.exec( async function(err, user) {
		if (err) {
			next(createError(500, "msg", err));
			return;
		}

		return res.status(200).send({
			followers: user.followers
		});
	});

}
exports.getUsers = function(req, res, next){
	var pseudo = req.query.pseudo;
	User.find({pseudo: { "$regex": pseudo, "$options": "i" } })
	.limit(5)
	.exec( async function(err, users) {
		if (err) {
			next(createError(500, "msg", err));
			return;
		}		
		return res.status(200).send({
			users: users
		});
	});

}