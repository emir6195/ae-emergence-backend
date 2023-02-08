var jwt = require('jsonwebtoken');
const SECRET = 'BWe2;sD"!}dhxe!mXi4r&soeYn]e(r{19P$;Nr0hv7Tsg6(.tBw?ie0ptr=%[@cshXc~IN&e'

class JWT_Manager {
    createAccessToken(data) {
        var token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            data: data

        }, SECRET);
        return token;
    };

    validateToken(token) {
        try {
            var decoded = jwt.verify(token, SECRET);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    
    tokenDecoder(token) {
        try {
            return jwt.verify(token, SECRET);
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    getDecoded(token) {
        try {
            return jwt.verify(token, SECRET);
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

module.exports = JWT_Manager;