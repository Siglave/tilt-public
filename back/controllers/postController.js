var mongoose = require("mongoose");
var User = require('../models/userModel');
var Post = require('../models/postModel');
var Reply = require('../models/replyModel');
var createError = require("http-errors");

exports.createPost = function(req, res, next) {
	var userId = req.userId;
    
	User.findById(userId)
	.exec( async function(err, user) {
		if (err) {
            next(createError(500, "msg", err));
            return;
        }
        var postToCreate = {
            ...req.body.post,
            creator: user._id
        }
        try{
            var post = await (new Post(postToCreate)).save();
        }catch(e){
            next(createError(500, "msg", e));
            return;
        }
        user.posts.push(post);
        await user.save();
        post.populate('creator',(err, p)=>{
            return res.status(200).send({
                post: p
            });
        });
	});
};

exports.updatePost = async function(req, res, next){
    var userId = req.userId;
    
    var post = await Post.findById(req.params.postId).populate({
        path: 'creator',
        model: 'User'
    }).exec();
   
    if(post.creator._id.toString() === userId.toString()){

        post.message = req.body.message;
        post.tags = req.body.tags;
        try{
            await post.save();
        }catch(e){
            next(createError(500, "msg", e));
            return;
        }
        return res.status(200).send({
            post: post
        });

    }else{
        next(createError(500, "msg", {name: 'AuthorisationError', message: "You can't modify this post"}));
        return;
    }
}

exports.getPosts = function(req, res, next){
    var sort = {};
    var query= {};
    
    if(req.query.filter === 'top'){
        sort = {
            vote: 'desc' 
        }
        var today = new Date();
        if(req.query.time === 'week'){
            today.setDate(today.getDate()-7);
            query = {creationDate: {$gte: today}}
        }
        if(req.query.time === 'month'){
            today.setDate(today.getDate()-30);
            query = {creationDate: {$gte: today}}
        }
    }
    if(req.query.filter === 'new'){
        sort = {
            creationDate: 'desc' 
        }
    }
    
    Post.find(query)
        .populate({
            path: 'creator',
            model: 'User'
        })
		.sort(sort)
		.exec(function (err, posts) {
			if (err) {
                next(createError(500, "msg", err));
                return;
			}
			
			res.status(200).json({
                posts: posts
            });
		});
}


exports.vote = function(req, res, next) {
    var userId = req.userId;
    var postId = req.params.postId;
    
	User.findById(userId)
	.exec( async function(err, user) {
		if (err) {
            next(createError(500, "msg", err));
            return;
        }
        var post = await Post.findById(postId).exec();
        var upvote = req.body.upvote;
        //Check if user have already voted
        var voteFound = post.voteUsers.find((vote)=>{
            return vote.user.toString() === user._id.toString();
        });
        
        if(upvote){
            if(voteFound !== undefined){
                if(!voteFound.upvote){
                    // User Chose to change his vote, so remove previous vote
                    var newVoteUsers =  post.voteUsers.filter((v)=>{
                        return v._id.toString() !== voteFound._id.toString();
                    })
                    post.voteUsers = newVoteUsers;
                    await post.save();
                    // Remove for user
                    var newVotePosts = user.votePosts.filter((v)=>{
                        return v.post.toString() !== post._id.toString();
                    })
                    user.votePosts = newVotePosts;
                    await user.save();
                }else{
                    // Try to submit same vote throw error
                    next(createError(500, "User already voted", {errors:{vote: {message :"User already voted", name: "vote"} }}));
                    return
                }
            }

            post.vote = post.vote + 1;
            post.voteUsers.push({user: user._id, upvote: true});
            await post.save();
            
            user.votePosts.push({post:post._id, upvote: true});
            await user.save();
            // Add 1 vote to the post's creator
            var creator = await User.findById(post.creator._id).exec();
            creator.vote = creator.vote + 1;
            await creator.save();
        
        }else{
            if(voteFound !== undefined){
                if(voteFound.upvote){
                    // User Chose to change his vote
                    var newVoteUsers =  post.voteUsers.filter((v)=>{
                        return v._id.toString() !== voteFound._id.toString();
                    })
                    post.voteUsers = newVoteUsers;
                    await post.save();
                    // Remove for user
                    var newVotePosts = user.votePosts.filter((v)=>{
                        return v.post.toString() !== post._id.toString();
                    })
                    user.votePosts = newVotePosts;
                    await user.save();
                }else{
                    // Try to submit same vote throw error
                    next(createError(500, "User already voted", {errors:{vote: {message :"User already voted", name: "vote"} }}));
                    return
                }
            }

            post.vote = post.vote - 1;
            post.voteUsers.push({user: user._id, upvote: false});
            await post.save();

            user.votePosts.push({post:post._id, upvote: false})
            await user.save();
        }
       
        return res.status(200).send({
            post: post,
            votePosts: user.votePosts
		});
	});
};

exports.deletePost = async function(req, res, next){
    var postIdToDelete = req.params.postId;

    try{
        var post = await Post.findById(postIdToDelete).exec();
        var creator = await User.findById(post.creator).exec();

        creator.posts = creator.posts.filter((postId)=>{
            if(postId.toString() !== postIdToDelete){
                return postId;
            }
        });
        await creator.save();
        await Reply.deleteMany({post: postIdToDelete}).exec();
        await Post.deleteOne({_id: postIdToDelete}).exec();
    }catch(err){
        next(createError(500, "Error", err));
        return;
    }
    
    return res.status(200).send({
        msg: 'Post Deleted'
    });
}
