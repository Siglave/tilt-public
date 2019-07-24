var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    creationDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    creator: {
        type: Schema.ObjectId,
        ref: "User",
    },
    message: {
        type: String,
        required: [true, "Message requis"]
    },
});

module.exports = mongoose.model("Message", MessageSchema);