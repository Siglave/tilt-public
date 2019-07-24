var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var authRoute = require("./routers/authRoute");
var userRoute = require("./routers/userRoute");
var postRoute = require("./routers/postRouter");
var discussionRoute = require("./routers/discussionRoute");
var adminRoute = require("./routers/adminRoute");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Route Authentication and register
router.use("/", authRoute);

// Route User
router.use("/user", userRoute);

// Route Post
router.use("/post", postRoute);

// Route Discussion
router.use("/discussion", discussionRoute);

// Route Admin
router.use("/admin", adminRoute);

module.exports = router;