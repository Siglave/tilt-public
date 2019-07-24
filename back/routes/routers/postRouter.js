var express = require('express');
var router = express.Router();

var authController = require("../../controllers/authController");
var postController = require("../../controllers/postController");
var replyController = require("../../controllers/replyController");
var adminController = require("../../controllers/adminController");


// Create post route
router.post('/',authController.verifyToken, postController.createPost);

// Update post route
router.put('/:postId',authController.verifyToken, postController.updatePost);

// Get post route
router.get('/', postController.getPosts);

// Vote post
router.post('/:postId/vote', authController.verifyToken, postController.vote);

// Create Reply
router.post('/:postId/reply', authController.verifyToken, replyController.createReply);

// Get post replies
router.get('/:postId/replies', authController.verifyToken, replyController.getReplies);

// Delete post
router.delete('/:postId', authController.verifyToken, adminController.verifyAdmin, postController.deletePost);

module.exports = router;