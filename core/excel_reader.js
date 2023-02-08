const Excel = require('exceljs');
const employeeModel = require('../models/employee.model');

function readEmployeeExcel(filepath) {
    const workbook = new Excel.Workbook();
    workbook.xlsx.readFile(filepath)
        .then(function () {
            const worksheet = workbook.getWorksheet(1);
            worksheet.eachRow({ includeEmpty: false }, async function (row, rowNumber) {
                console.log("Row " + rowNumber + " = " + row.values);
                if (rowNumber > 1) {
                    try {
                        await employeeModel.create(
                            {
                                name: row.values[1],
                                surname: row.values[2],
                                address: row.values[3],
                                district: row.values[4],
                                city: row.values[5],
                                msisdn: row.values[6],
                                emergency_contact_name: row.values[7],
                                emergency_contact_surname: row.values[8],
                                emergency_contact_msisdn: row.values[9],
                            }
                        );
                    } catch (error) {
                        console.log(error, 'mongo error.');
                    }
                }
            });
        });
};



module.exports = readEmployeeExcel;