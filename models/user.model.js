const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username : {type: String, required: true},
    password : {type: String, required: true},
    name : {type: String, required: true},
    surname : {type: String, required: true},
    createdAt : {type: Date, required: true, default : new Date()},
});

module.exports = mongoose.model("users", UserSchema);