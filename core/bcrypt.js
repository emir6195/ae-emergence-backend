const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

class PasswordHashManager {

    constructor() {
        this.saltRounds = 10;
    }

    createUser(username, password, name, surname, createdAt = Date.now()) {
        var status = false;
        bcrypt.hash(password, this.saltRounds, async function (err, hash) {
            var doc = {
                username: username,
                password: hash,
                name: name,
                surname: surname,
                createdAt: createdAt,
                isBanned: false
            }
            status = await userModel.create(doc);
        });
        return status;
    }

    async validateUser(username, password) {
        var user = await userModel.findOne({ username: username });
        if (user) {
            return bcrypt.compareSync(password, user.password);
        } else {
            return false;
        }
    }

}

module.exports = PasswordHashManager;