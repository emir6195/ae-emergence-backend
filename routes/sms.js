const router = require('express').Router();
const incomingSmsModel = require('../models/incoming-sms.model');
const outgoingSmsModel = require('../models/outgoing-sms.model');
const employeesModal = require('../models/employee.model');

router.post('/send-sms', async (req,res,next) => {
    try {
        // TO DO
        let data = req.body;
        let employee_name = await employeesModal.findOne({msisdn: data.to});
        if (employee_name) {
            data.employee = `${employee_name.name || "unknown"} ${employee_name.surname || "employee"}`;
        } else {
            data.employee = "unknown employee";
        }
        let status = await outgoingSmsModel.create(data);
        res.send({status:status});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/get-sms', async (req,res,next) => {
    try {
        // TO DO
        let data = req.body;
        let outgoingSms = await outgoingSmsModel.findOne({to: data.from}, {}, {sort : {'createdAt' : -1}});
        let update_outgoing = await outgoingSmsModel.updateOne({to:data.from}, {isAnswered: true});
        data.answered_message_id = outgoingSms._id;
        data.message_received_date = outgoingSms.createdAt;
        data.received_message = outgoingSms.message;
        data.employee = `${outgoingSms.employee}`;
        let status = await incomingSmsModel.create(data);
        res.send({status:status});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/incoming-sms', async (req,res,next) => {
    try {
        let incoming_sms = await incomingSmsModel.find({});
        res.send(incoming_sms);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/outgoing-sms', async (req,res,next) => {
    try {
        let outgoing_sms = await outgoingSmsModel.find({});
        res.send(outgoing_sms);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
