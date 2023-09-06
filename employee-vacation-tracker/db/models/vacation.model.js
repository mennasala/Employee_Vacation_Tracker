const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
const Vacation = mongoose.model("Vacation", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  vacationType: {
    type: String,
    enum: ["annual leave", "sick leave", "unpaid leave", "paternal leave", "maternity leave"],
    required: true,
    trim: true,
    lowercase: true,
  },
  startDateAndTime: {
    type: String,
    default: "",
  },
  endDateAndTime: {
    type: String,
    default: "",
  },
  dateAndTimeOfTheLeave: {
    type: String,
    default: "",
  },
  
});
module.exports = Vacation;
