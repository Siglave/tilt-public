var express = require('express');
var router = express.Router();
var authController = require('../../controllers/authController');
var userController = require('../../controllers/userController');

//Get User with token
router.get('/me', authController.verifyToken, userController.getUserToken);
//Get User info
router.get('/:pseudo', authController.verifyToken, userController.getUserInfo);
//Get User filter
router.get('/', authController.verifyToken, userController.getUsers);
//Update User info
router.put('/', authController.verifyToken, userController.update);
//Follow User
router.post('/follow/:userId', authController.verifyToken, userController.follow);
//Unfollow User
router.post('/unfollow/:userId', authController.verifyToken, userController.unFollow);
//Get follows
router.get('/:userId/follows', authController.verifyToken, userController.getFollows);
//Get followers
router.get('/:userId/followers', authController.verifyToken, userController.getFollowers);

module.exports = router;
