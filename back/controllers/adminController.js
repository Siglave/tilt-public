var mongoose = require("mongoose");
var User = require('../models/userModel');
var Post = require('../models/postModel');
var createError = require("http-errors");

exports.verifyAdmin = function(req, res, next) {
	var userId = req.userId;

	User.findById(userId)
	.exec(function(err, user) {
		if (err) {
            next(createError(500, "msg", e));
            return;
        }
        if(user.isAdmin){
            next();
        }else{
            next(createError(400, "You must be an admin to access this route "));
        }
		
	});
};

exports.getStats = async function(req, res, next) {

    var pipelinePost = [
        {
            $group: {
                _id: { 
                    month: { $month: "$creationDate" }, 
                    day: { $dayOfMonth: "$creationDate" }, 
                    year: { $year: "$creationDate" } 
                },
                documentCount: {$sum: 1}
            }
        },
        {
            $sort : {'_id.month' : -1,'_id.day': -1}
        }
    ]
    var postsByDay = await Post.aggregate(pipelinePost).exec();
    var totalPosts = await Post.count();
    var totalUsers = await User.count();
    var downvotePosts = await Post.find({vote: {$lt: 0}}).populate({
		path: 'creator',
		model: 'User'
	}).limit(5).exec();

    return res.status(200).send({
		stats: {
            postsByDay: postsByDay,
            totalPosts: totalPosts,
            totalUsers: totalUsers,
            downvotePosts: downvotePosts
        }
	});
    
	
};