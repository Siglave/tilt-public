var mongoose = require("mongoose");
var User = require('../models/userModel');
var Discussion = require('../models/discussionModel');
var Message = require('../models/messageModel');
var createError = require("http-errors");

exports.createDiscussion = async function(req, res, next) {
    var userId = req.userId;
    var receiverId = req.body.receiverId;
    
    try{
        // Fetch users
        var sender = await User.findById(userId).exec();
        var receiver = await User.findById(receiverId).exec();
        //Create Message and Discussion
        var discussion = await (new Discussion()).save();
        var message = await (new Message({message: req.body.message, creator: mongoose.Types.ObjectId(sender._id)})).save();
        discussion.messages.push(mongoose.Types.ObjectId(message._id))
        discussion.users.push(mongoose.Types.ObjectId(sender._id))
        discussion.users.push(mongoose.Types.ObjectId(receiver._id))
        await discussion.save();
        //Add Discussion to users
        sender.discussions.push(discussion._id);
        await sender.save();
        receiver.discussions.push(discussion._id);
        await receiver.save();

    }catch(e){
        next(createError(500, "msg", e));
        return;
    }
    discussion
        .populate('users')
        .populate('messages',(err, disc)=>{
            disc.populate('messages.creator', (e, di)=>{
                return res.status(200).send({
                    discussion: di
                });
            })
        })
};

exports.addMessage = async function(req, res, next) {
    var userId = req.userId;
    var discussionId = req.params.discussionId;
    
    try{
        var discussion = await Discussion.findById(discussionId).exec();
        var message = await (new Message({message: req.body.message, creator: userId})).save();
        discussion.messages.push(message)
        await discussion.save();

    }catch(e){
        next(createError(500, "msg", e));
        return;
    }
    discussion
        .populate('users')
        .populate('messages',(err, disc)=>{
            disc.populate('messages.creator', (e, di)=>{
                return res.status(200).send({
                    discussion: di
                });
            })
        })
}

exports.getDisussionsUser = function(req, res, next) {
    var userId = req.userId;

    User.findById(userId)
    .populate({
		path: 'discussions',
		model: 'Discussion'
	})
	.populate({
		path: 'discussions',
		populate: { path: 'messages', model: 'Message' }
    })
	.populate({
		path: 'discussions',
		populate: { path: 'messages', populate: {path: 'creator', model: 'User' } }
    })
	.populate({
		path: 'discussions',
		populate: { path: 'users', model: 'User' }
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
			discussions: user.discussions
		});
	});
}