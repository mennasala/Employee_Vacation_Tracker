const userModel = require("../../db/models/user.model");
const myHelper = require("../helper"); 
class User {
    static all = async (req, res) => {
        try {
            if(req.user.role != "admin"){
                return res.status(500).json({ message: 'you are unAuthorized to do this' });
            }
            const users = await userModel.find();
            //console.log(users);
            myHelper.sendResponse(
                res,
                200,
                true,
                users,
                "requested all users successfully"
            );
        } catch (err) {
            myHelper.sendResponse(res, 500, false, err, err.message);
        }
    };

    static register = async (req, res) => {
        try {
            const newUser = new userModel(req.body);
            await newUser.save();
            myHelper.sendResponse(res, 200, true, newUser, "Registered Successfully");
        } catch (err) {
            myHelper.sendResponse(res, 500, false, err, err.message);
        }
    };

    static login = async (req, res) => {
        try {
            const userData = await userModel.loginUser(
                req.body.email,
                req.body.password
            );
            const token = await userData.generateToken();
            myHelper.sendResponse(
                res,
                200,
                true,
                { user: userData, token },
                "successfully logged in"
            );
        } catch (err) {
            myHelper.sendResponse(res, 500, false, err, err.message);
        }
    };

    static logOut = async (req, res) => {
        try {
            //req.user , req.token
            req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
            await req.user.save();
            myHelper.sendResponse(res, 200, true, null, "logged out");
        } catch (e) {
            myHelper.sendResponse(res, 500, false, e, e.message);
        }
    };
    static logOutFromAllDevices = async (req, res) => {
        try {
            //req.user , req.token
            req.user.tokens = [];
            await req.user.save();
            myHelper.sendResponse(res, 200, true, null, "logged out from all devices");
        } catch (e) {
            myHelper.sendResponse(res, 500, false, e, e.message);
        }
    }; 
    static getAllEmployees = async (req, res) => {
        try { 
            if(req.user.role != "admin"){
                return res.status(500).json({ message: 'you are unAuthorized to do this' });
            } 
            const employees = await userModel.find({ role: 'employee' }); 
            // Check if any employees were found
            if (!employees || employees.length === 0) {
                return res.status(404).json({ message: 'No employees found.' });
            }

            myHelper.sendResponse(res, 200, true, employees, "successfully returned all employees");
        } catch (e) {
            myHelper.sendResponse(res, 500, false, e, e.message);
        }
    };
    static getEmployeeById = async (req, res) => {
        const employeeId = req.params.id;

        try {
            if(req.user.role != "admin"){
                return res.status(500).json({ message: 'you are unAuthorized to do this' });
            }
            const employee = await userModel.findOne({ _id: employeeId, role: 'employee' });

            if (!employee) {
                return res.status(404).json({ message: 'Employee not found.' });
            }

            myHelper.sendResponse(res, 200, true, employee, "successfully returned the employee");
        } catch (e) {
            myHelper.sendResponse(res, 500, false, e, e.message);
        }
    };

    static updateEmployee = async (req, res) => {
        const employeeId = req.params.id;
        const updates = req.body;

        try {
            if(req.user.role != "admin"){
                return res.status(500).json({ message: 'you are unAuthorized to do this' });
            }
            const updatedEmployee = await userModel.findByIdAndUpdate(
                employeeId,
                updates,
                { new: true } // Return the updated employee
            );

            if (!updatedEmployee) {
                return res.status(404).json({ message: 'Employee not found.' });
            }
            myHelper.sendResponse(res, 200, true, updatedEmployee, "successfully updated the employee");
        } catch (e) {
            myHelper.sendResponse(res, 500, false, e, e.message);
        }
    };

    static deleteEmployee = async (req, res) => {
        const employeeId = req.params.id;

        try {
            if(req.user.role != "admin"){
                return res.status(500).json({ message: 'you are unAuthorized to do this' });
            }
            const deletedEmployee = await userModel.findByIdAndDelete(employeeId);

            if (!deletedEmployee) {
                return res.status(404).json({ message: 'Employee not found.' });
            }

            // Return a success message as a JSON response
            myHelper.sendResponse(res, 200, true, "", "Employee deleted successfully.");
        } catch (e) {
            myHelper.sendResponse(res, 500, false, e, e.message);
        }
    };
}
module.exports = User;
