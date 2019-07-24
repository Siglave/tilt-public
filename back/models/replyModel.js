var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReplySchema = new Schema({
    message: {
        type: String,
        required: [true, "Message requis"],
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
    post: {
        type: Schema.ObjectId,
        ref: "Post",
    }

});

module.exports = mongoose.model("Reply", ReplySchema);