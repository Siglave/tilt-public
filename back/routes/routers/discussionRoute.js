var express = require('express');
var router = express.Router();

var discussionController = require("../../controllers/discussionController");
var authController = require("../../controllers/authController");


// Create post route
router.post('/',authController.verifyToken, discussionController.createDiscussion);

router.post('/:discussionId/message',authController.verifyToken, discussionController.addMessage);
//Get user discussions
router.get('/',authController.verifyToken, discussionController.getDisussionsUser);

module.exports = router;