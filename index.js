const express = require(`express`);
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

// PRE PROCESS.
app.use(cors(corsOptions))
app.use(express.json());
app.use(require('./middleware/logger'));
// app.use(require('./middleware/secure'));

// API'S
app.use(require('./routes/auth'));
app.use(require('./routes/employee'));
app.use(require('./routes/upload'));
app.use(require('./routes/sms'));
app.use(require('./routes/stats'));
//POST PROCESS
app.use(require('./middleware/error'));


const serve = async () => {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/ae-emergence"
        );
        app.listen(3000, () => console.log("Server started on port 3000!"));
    } catch (error) {
        console.error(error);
    }
};

serve();