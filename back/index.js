
var http = require('http');
var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var config = require("./config");

var indexRouter = require("./routes/index");

var mongoDB = "mongodb://localhost/tilt";

mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection fail"));

var app = express();

app.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-access-token, Content-Type, Accept");

	next();
});
// Logger : log the api route and the code return
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));

// Routes
app.use("/api/v1", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    var jsonError = {
		name: err.name,
		message: err.message
	};

    if(err.status === 404){
        jsonError = {message :err.message, status: err.status};
    }else{
		if(err.name === 'ValidationError'){
			jsonError = {
				name: err.name,
				errors: err.errors
			};
		}
	}	
    res.status(err.status).json(jsonError);
});

var port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

var server = http.createServer(app);
server.listen(port);

