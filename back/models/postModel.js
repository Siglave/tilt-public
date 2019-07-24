var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");


var Vote = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User",
    },
    upvote: {
        type: Boolean
    }
})

var PostSchema = new Schema({
    message: {
        type: String,
        required: [true, "Message requis"],
    },
    vote:{
        type: Number,
        default: 0,
    },
    tags: {
        type: [String]
    },
    creationDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    creator: {
        type: Schema.ObjectId,
        ref: "User",
    },
    voteUsers: [Vote],
    replies:[{
        type: Schema.ObjectId,
        ref: "Reply",
    }]
});

module.exports = mongoose.model("Post", PostSchema);