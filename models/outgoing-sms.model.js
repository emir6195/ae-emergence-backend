const mongoose = require("mongoose");

const OutgoingSMSSchema = new mongoose.Schema({
    from : {type: String, required: true},
    to : {type: String, required: true},
    employee : {type: String, required: true, default:"unknown"},
    message : {type: String, required: true},
    createdAt : {type: Date, required: true, default : new Date()},
    isAnswered: {type: Boolean, required: true, default: false}
});

module.exports = mongoose.model("outgoing-sms", OutgoingSMSSchema);