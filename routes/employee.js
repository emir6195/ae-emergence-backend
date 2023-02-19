const router = require('express').Router();
const employeesModel = require('../models/employee.model');

router.get('/employees', async (req, res, next) => {
    try {
        let filter = req.query.filter;
        var employees;
        if (filter != null && filter != undefined && filter != 'undefined') {
            filter = JSON.parse(filter);
            let selectedCities = filter.filter(element => element.type == 'city').map(element => element.name);;
            let selectedDistricts = filter.filter(element => element.type == 'district').map(element => element.name);
            console.log(selectedCities);
            console.log(selectedDistricts);
            if (selectedCities.length > 0 && selectedDistricts.length > 0) {
                employees = await employeesModel.find({
                    city: { $in: selectedCities },
                    district: { $in: selectedDistricts }
                });
            } else if (selectedCities.length > 0) {
                employees = await employeesModel.find({
                    city: { $in: selectedCities },
                });
            } else if (selectedDistricts.length > 0) {
                employees = await employeesModel.find({
                    district: { $in: selectedDistricts }
                });
            } else {
                employees = await employeesModel.find({});
            }
        } else {
            employees = await employeesModel.find({});
        }
        res.send(employees);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/employees/:id', async (req, res, next) => {
    try {
        let employee = await employeesModel.findOne({ _id: req.params['id'] });
        res.send(employee);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/employees', async (req, res, next) => {
    try {
        let status = await employeesModel.create(req.body);
        res.send({ status: status });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.delete('/employees/:id', async (req, res, next) => {
    try {
        let status = await employeesModel.deleteOne({ _id: req.params['id'] });
        res.send({ status: status });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.put('/employees', async (req, res, next) => {
    try {
        let status = await employeesModel.updateOne({ _id: req.body._id }, req.body);
        res.send(status);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;