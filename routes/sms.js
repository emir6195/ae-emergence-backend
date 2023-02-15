const router = require('express').Router();
const incomingSmsModel = require('../models/incoming-sms.model');
const outgoingSmsModel = require('../models/outgoing-sms.model');

router.post('/send-sms', async (req,res,next) => {
    try {
        // TO DO
        let status = await outgoingSmsModel.create(req.body);
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
        let answered_message_id = await outgoingSmsModel.findOne({to: data.from}, {}, {sort : {'createdAt' : -1}});
        data.answered_message_id = answered_message_id;
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
