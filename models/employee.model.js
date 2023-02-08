const mongoose = require("mongoose");

const EmployeesSchema = new mongoose.Schema({
    name : {type: String, required: true},
    surname : {type: String, required: true},
    address : {type: String, required: true},
    district : {type: String, required: true},
    city : {type: String, required: true},
    msisdn : {type: String, required: true},
    emergency_contact_name : {type: String, required: true},
    emergency_contact_surname : {type: String, required: true},
    emergency_contact_msisdn : {type: String, required: true},
    createdAt : {type: Date, required: true, default : new Date()},
});

module.exports = mongoose.model("employees", EmployeesSchema);