const router = require("express").Router();
const Vacation = require("../app/controller/vacation.controller");
const auth = require("../app/midleware/auth.midleware");

router.post("/createVacation", auth, Vacation.createVacation);
router.get("/myVacations", auth, Vacation.geMyVacations);



router.get("/getSingleVacation/:id", auth, Vacation.getVacationById);
router.delete("/deleteSingle/:id", auth, Vacation.deleteVacation);
router.patch("/updateVacation/:id", auth, Vacation.updateVacation);
module.exports = router;
