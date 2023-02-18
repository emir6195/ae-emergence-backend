const mongoose = require("mongoose");

const IncomingSMSSchema = new mongoose.Schema({
    from : {type: String, required: true},
    to : {type: String, required: true},
    message : {type: String, required: true},
    employee : {type: String, required: true, default:"unknown"},
    createdAt : {type: Date, required: true, default : new Date()},
    answered_message_id : {type: String, required: false},
    message_received_date: {type: Date, required: false},
    received_message: {type: String, required: false}
});

module.exports = mongoose.model("incoming-sms", IncomingSMSSchema);