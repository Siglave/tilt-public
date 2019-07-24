var express = require('express');
var router = express.Router();

var authController = require("../../controllers/authController");
var adminController = require("../../controllers/adminController");

// Create post route
router.get('/stats',authController.verifyToken, adminController.verifyAdmin, adminController.getStats );

module.exports = router;