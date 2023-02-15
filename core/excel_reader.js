const Excel = require('exceljs');
const employeeModel = require('../models/employee.model');

class ExcelOps {
    constructor() { }

    readEmployeeExcel(filepath) {
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

    async createEmployeeExcel() {
        var employees = await employeeModel.find({});
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Employees');
        worksheet.columns = [
            { header: 'name', key: 'name' },
            { header: 'surname', key: 'surname' },
            { header: 'address', key: 'address' },
            { header: 'district', key: 'district' },
            { header: 'city', key: 'city' },
            { header: 'msisdn', key: 'msisdn' },
            { header: 'emergency_contact_name', key: 'emergency_contact_name' },
            { header: 'emergency_contact_surname', key: 'emergency_contact_surname' },
            { header: 'emergency_contact_msisdn', key: 'emergency_contact_msisdn' },
        ];

        employees.forEach(employee => {
            worksheet.addRow(employee);
        });
        var filename = 'employees_' + new Date().toISOString() + '.xlsx';
        await workbook.xlsx.writeFile('./downloads/' + filename);
        return filename;
    }

}


module.exports = ExcelOps;