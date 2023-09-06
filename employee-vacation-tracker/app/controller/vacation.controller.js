const vacationModel = require("../../db/models/vacation.model");
const myHelper = require("../../app/helper");
class Vacation {
    static createVacation = async (req, res) => {
        try {
            const vacationData = new vacationModel({
                userId: req.user._id,
                ...req.body,
            });
            await vacationData.save();
            myHelper.sendResponse(res, 200, true, vacationData, "created vacation successfully");
        } catch (e) {
            myHelper.sendResponse(res, 500, false, e, e.message);
        }
    };
    static geMyVacations = async (req, res) => {
        try {
            // const posts = await postModel.find({userId: req.user._id})
            await req.user.populate("myVacations");
            myHelper.sendResponse(
                res,
                200,
                true,
                {
                    vacations: req.user.myVacations,
                    user: req.user,
                },
                "successfully get all your vacations"
            );
        } catch (e) {
            myHelper.sendResponse(res, 500, false, e, e.message);
        }
    };
    static getVacationById = async (req, res) => {
        const VacationId = req.params.id;

        try { 
            const vacation = await vacationModel.findOne( {_id: VacationId});

            if (!vacation) {
                return res.status(404).json({ message: 'vacation not found.' });
            }

            myHelper.sendResponse(res, 200, true, vacation, "successfully returned the vacation");
        } catch (e) {
            myHelper.sendResponse(res, 500, false, e, e.message);
        }
    };


    static updateVacation = async (req, res) => {
        const vacationId = req.params.id;
        const updates = req.body;

        try {
            const updatedVacation = await vacationModel.findByIdAndUpdate(
                vacationId,
                updates,
                { new: true } // Return the updated vacation
            );

            if (!updatedVacation) {
                return res.status(404).json({ message: 'Vacation leave not found.' });
            }

            myHelper.sendResponse(res, 200, true, updatedVacation, "successfully updated a vacation");
        } catch (e) {
            myHelper.sendResponse(res, 500, false, e, e.message);
        }
    };

    static deleteVacation = async (req, res) => {
        const vacationId = req.params.id;

        try {
            const deletedVacation = await vacationModel.findByIdAndDelete(vacationId);

            if (!deletedVacation) {
                return res.status(404).json({ message: 'Vacation leave not found.' });
            }

            myHelper.sendResponse(res, 200, true, "", 'Vacation leave deleted successfully.');
        } catch (e) {
            myHelper.sendResponse(res, 500, false, e, e.message);
        }
    };

}
module.exports = Vacation;
