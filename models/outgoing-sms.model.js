const mongoose = require("mongoose");

const OutgoingSMSSchema = new mongoose.Schema({
    from : {type: String, required: true},
    to : {type: String, required: true},
    name : {type: String, required: true},
    surname : {type: String, required: true},
    message : {type: String, required: true},
    createdAt : {type: Date, required: true, default : new Date()},
});

module.exports = mongoose.model("outgoing-sms", OutgoingSMSSchema);