var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DiscussionSchema = new Schema({
    creationDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    messages: [{
        type: Schema.ObjectId,
        ref: "Message",
    }],
    users:[{
        type: Schema.ObjectId,
        ref: "User",
    }]
});

module.exports = mongoose.model("Discussion", DiscussionSchema);