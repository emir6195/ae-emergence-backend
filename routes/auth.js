const router = require('express').Router();
const PasswordHashManager = require('../core/bcrypt');
const JWT_Manager = require('../core/jwt');
const userModel = require('../models/user.model');
const passwordHashManager = new PasswordHashManager();
const jwt_manager = new JWT_Manager();

router.post('/user/login', async (req, res, next) => {
    try {
        var data = req.body;
        var token = null;
        var isUserValid = await passwordHashManager.validateUser(data.username, data.password);

        if (isUserValid) {
            res.send(
                {
                    success: true,
                    token: jwt_manager.createAccessToken({ username: data.username })
                }
            )
        } else {
            res.status(401).send(
                {
                    success: false,
                    token: token
                }
            )
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/user/register', async (req, res, next) => {
    try {
        var isFirstUser = await userModel.find({});
        console.log(isFirstUser, '****');
        if ( Array.isArray(isFirstUser) && isFirstUser.length >= 1) {
            let token = req.header('Authorization');
            if (token) {
                let isValid = jwt_manager.validateToken(token.replace('Bearer ', ''));
                if (isValid) {
                    var userCreateStatus;
                    var data = req.body;
                    var user = await userModel.findOne({ username: req.body.username });
                    if (user) {
                        console.log('Username is not available...');
                        res.status(200).send({ success: false, token: null, message: 'Username is already in use.' });
                    } else {
                        userCreateStatus = await passwordHashManager.createUser(data.username, data.password, data.name, data.surname);
                        if (userCreateStatus) {
                            res.send({ success: true, token: jwt_manager.createAccessToken({ username: data.username }), message: 'User is created successfully!' })
                        } else {
                            res.send({ message: 'Something went wrong while creating user.' })
                        }
                    }
                } else {
                    res.status(401).send({ message: 'Unauthorized!' });
                }
            } else {
                res.status(401).send({ message: 'Unauthorized!' });
            }
        } else {
            var userCreateStatus;
            var data = req.body;
            var user = await userModel.findOne({ username: req.body.username });
            if (user) {
                console.log('Username is not available...')
                res.status(200).send({ success: false, token: null, message: 'Username is already in use.' })
            } else {
                userCreateStatus = await passwordHashManager.createUser(data.username, data.password, data.name, data.surname);
                if (userCreateStatus) {
                    res.send({ success: true, token: jwt_manager.createAccessToken({ username: data.username }), message: 'User is created successfully!' })
                } else {
                    res.send({ message: 'Something went wrong while creating user.' })
                }
            }
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/user/validateToken', async (req, res, next) => {
    try {
        var isTokenValid = jwt_manager.validateToken(req.body.token);
        res.send({ isTokenValid: isTokenValid })
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/user', async (req, res, next) => {
    try {
        var panelusers = await userModel.find({});
        res.send(panelusers)
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/user/delete', async (req, res, next) => {
    try {
        var status = await userModel.deleteOne({ _id: req.body._id });
        res.send({ status: status });
    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = router;