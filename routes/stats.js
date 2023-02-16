const router = require('express').Router();
const employeesModal = require('../models/employee.model');
const incomingSmsModal = require('../models/incoming-sms.model');
const outgoingSmsModal = require('../models/outgoing-sms.model');


router.post('/stats', async (req, res, next) => {
    try {
        let begin_date = req.body.begin_date || new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7)).toISOString().split('T')[0];
        let end_date = req.body.end_date || new Date().toISOString().split('T')[0];
        let date_labels = createDateLabels(begin_date, end_date);
        let countOfEmployees = await employeesModal.countDocuments();
        let incomingMessages = await incomingSmsModal.find(
            {
                createdAt: {
                    $gte: begin_date,
                    $lt: end_date
                }
            }
        );
        let outgoingMessages = await outgoingSmsModal.find(
            {
                createdAt: {
                    $gte: begin_date,
                    $lt: end_date
                }
            }
        );
        let incomingMessagesDataset = [];
        let outgoingMessagesDataset = [];
        date_labels.forEach(label => {
            incomingMessagesDataset.push(incomingMessages.filter(element => element.createdAt.toISOString().includes(label)).length);
            outgoingMessagesDataset.push(outgoingMessages.filter(element => element.createdAt.toISOString().includes(label)).length);
        });
        res.send({
            countOfEmployees,
            date_labels,
            countOfIncomingMessages: incomingMessages.length,
            countOfOutgoingMessages: outgoingMessages.length,
            dataset: [
                {
                    label: 'Incoming SMS',
                    data: incomingMessagesDataset,
                    lineTension: 0.25,
                    borderRadius: 25,
                    borderWidth: 2
                },
                {
                    label: 'Outgoing SMS',
                    data: outgoingMessagesDataset,
                    lineTension: 0.25,
                    borderRadius: 25,
                    borderWidth: 2
                }
            ]
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

function createDateLabels(begin_date, end_date) {
    let date_labels = [];
    begin_date = new Date(Date.parse(begin_date));
    end_date = new Date(Date.parse(end_date));
    console.log(begin_date, end_date);
    while (begin_date <= end_date) {
        date_labels.push(begin_date.toISOString().split('T')[0]);
        begin_date = new Date(begin_date.getTime() + (1000 * 60 * 60 * 24));
    }
    return date_labels;
}

module.exports = router;