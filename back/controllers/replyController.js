var mongoose = require("mongoose");
var Post = require('../models/postModel');
var Reply = require('../models/replyModel');
var createError = require("http-errors");

exports.createReply = function(req, res, next) {
    var userId = req.userId;
    var postId = req.params.postId;
    
	Post.findById(postId)
	.exec( async function(err, post) {
		if (err) {
            next(createError(500, "msg", err));
            return;
        }
        var replyToCreate = {
            ...req.body.reply,
            creator: mongoose.Types.ObjectId(userId),
            post: post._id
        }
        try{
            var reply = await (new Reply(replyToCreate)).save();
        }catch(e){
            next(createError(500, "msg", e));
            return;
        }
        post.replies.push(reply);
        await post.save();

        return res.status(200).send({
			reply: reply
		});
	});
};

exports.getReplies = function(req, res, next) {
    var postId = req.params.postId;
    
    Reply.find({post: mongoose.Types.ObjectId(postId)})
    .populate({
        path: 'creator',
        model: 'User'
    })
    .sort({
        creationDate: 'asc'
    })
	.exec( async function(err, replies) {
		if (err) {
            next(createError(500, "msg", err));
            return;
        }
        return res.status(200).send({
			replies: replies
		});
	});
};

