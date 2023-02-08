const multer = require('multer');
const router = require('express').Router();
const excel_reader = require('../core/excel_reader');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
        const allowedTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (allowedTypes.includes(file.mimetype)) {
            callback(null, file.originalname);
        } else {
            callback(new Error('File type is not allowed!'), false);
        }
    }
});

var upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), (req, res, next) => {
    try {
        console.log(req.file.filename);
        excel_reader('./uploads/' + req.file.filename);
        res.send({ message: "File is uploaded"});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;