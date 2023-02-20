const Jwt = require('../core/jwt');
const tokenValidator = new Jwt();

const allowed = ['/api/user/login', '/api/user/register']

module.exports = function (req, res, next) {
    if (!req.originalUrl.startsWith('/api')) {
        next();
    } else if (allowed.includes(req.originalUrl)) {
        next();
    } else {
        let token = req.header('Authorization');
        if (token) {
            let isValid = tokenValidator.validateToken(token.replace('Bearer ', ''));
            if (isValid) {
                next()
            } else {
                console.log({ message: "Unauthorized!", detail: "Token is not valid!" });
                res.status(401).send({ message: "Unauthorized!", detail: "Token is not valid!" });
            }
        } else {
            console.log({ message: "Unauthorized!", detail: "Token not found." });
            res.status(401).send({ message: "Unauthorized!", detail: "Token not found." });
        }
    }
};