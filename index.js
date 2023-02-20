const express = require(`express`);
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const fs = require('fs');
const path = require('path');


const uiPath = path.join( __dirname, 'panel', 'ae-emergence-frontend');
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}


// PRE PROCESS.
app.use(cors(corsOptions))
app.use(express.json());
app.use('/api', require('./middleware/logger'));
app.use(require('./middleware/secure'));

// API'S
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/employee'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/sms'));
app.use('/api', require('./routes/stats'));
// POST PROCESS
app.use('/api', require('./middleware/error'));
// FRONT-END
app.use(express.static(uiPath));
app.get('*', function (req, res, next) {
    try {
        fs.stat(uiPath + req.path, function (err) {
            if (err) {
                res.sendFile(uiPath + "/index.html", { uiPath });
            } else {
                res.sendFile(req.path, { uiPath });
            }
        })
    } catch (error) {
        console.log(error);
    }
});


const serve = async () => {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/ae-emergence"
            // "mongodb://host.docker.internal:27017/ae-emergence"
        );
        app.listen(3000, () => console.log("Server started on port 3000!"));
    } catch (error) {
        console.error(error);
    }
};

serve();