const mongoose = require("mongoose");

const IncomingSMSSchema = new mongoose.Schema({
    from : {type: String, required: true},
    to : {type: String, required: true},
    name : {type: String, required: true},
    surname : {type: String, required: true},
    message : {type: String, required: true},
    answered_message_id : {type: String, required: true, default: 'unknown'},
    createdAt : {type: Date, required: true, default : new Date()},
});

module.exports = mongoose.model("incoming-sms", IncomingSMSSchema);