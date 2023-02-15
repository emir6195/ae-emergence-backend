const multer = require('multer');
const router = require('express').Router();
const ExcelOps = require('../core/excel_reader');
const excel = new ExcelOps();

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

router.post('/upload-employees', upload.single('file'), (req, res, next) => {
    try {
        console.log(req.file.filename);
        excel.readEmployeeExcel('./uploads/' + req.file.filename);
        res.send({ message: "File is uploaded"});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/download-employees', async (req,res,next)=>{
    try {
        let filename = await excel.createEmployeeExcel();
        res.download('./downloads/' + filename);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;