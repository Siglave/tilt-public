var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

var Vote = new Schema({
    post: {
        type: Schema.ObjectId,
        ref: "Post",
    },
    upvote: {
        type: Boolean
    }
});
var UserSchema = new Schema({
    pseudo: {
        type: String,
        required: [true, "Pseudo requis"],
        unique: true,
        max: 100
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
              return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `${props.value} n'est pas un email valide`
        },
        required: [true, 'Email requis'],
        max: 100
    },
    description: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: [true, 'Mot de passe requis'],
        max: 100,
        select: false
    },
    roles: {
        type: [String],
        default: ["ROLE_USER"]
    },
    vote:{
        type: Number,
        default: 0
    },
    posts: [{
        type: Schema.ObjectId,
        ref: "Post",
    }],
    resetPasswordToken: {
        type: String,
        default: "",
        select:false
    },
    votePosts: [Vote],
    follows:[{
        type: Schema.ObjectId,
        ref: "User",
    }],
    followers:[{
        type: Schema.ObjectId,
        ref: "User",
    }],
    discussions:[{
        type: Schema.ObjectId,
        ref: "Discussion",
    }],
    creationDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
});
// Virtual

UserSchema.virtual("isAdmin").get(function () {
    return this.roles.find((role) => role === "ROLE_ADMIN") ? true : false;
});
module.exports = mongoose.model("User", UserSchema);