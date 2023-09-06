const router = require("express").Router();
const User = require("../app/controller/user.controller");
const auth = require("../app/midleware/auth.midleware");  

router.post("/register", User.register);
router.post("/login", User.login);

 

//logout from the current device
router.post("/logout", auth, User.logOut);
//logout all devices
router.post("/logoutAll", auth, User.logOutFromAllDevices);  
// get all employees
router.get("/getAllEmployees", auth, User.getAllEmployees);

//get single employee
router.get("/getSingleEmployee/:id", auth, User.getEmployeeById);

//update an employee
router.post("/updateEmployee/:id", auth, User.updateEmployee);
//delete an employee
router.delete("/deleteEmployee/:id", auth, User.deleteEmployee);


router.get("/", auth, User.all);
module.exports = router;
