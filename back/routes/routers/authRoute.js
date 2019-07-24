var express = require('express');
var router = express.Router();

var authController = require("../../controllers/authController");

// Register route
router.post('/register',authController.register);
// Login route
router.post('/login', authController.login);
// Send Mail for resetting password
router.post('/sendMailResetPassword', authController.sendMailResetPassword)
// Send Mail for resetting password
router.post('/changePassword', authController.changePassword)
/* 
// Logout route
router.post('/logout', authController.logout);

// Get new access Token route
router.post('/token', authController.token);

 */
module.exports = router;