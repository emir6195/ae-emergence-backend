const Jwt = require('../core/jwt');
const tokenValidator = new Jwt();

module.exports = function (req, res, next) {
    if (req.originalUrl == '/user/login' || req.originalUrl == '/user/register' ) {
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