const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

mongoose.set('strictQuery', true); 
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
      required: true, 
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true, 
      required: true,
    },
    joiningDateInTheCompany: {
        type: Date,
      },
      dOfBirth: {
        type: Date,
      },
      gender: {
        type: String,
        trim: true,
        lowercase: true,
        enum: ["male", "female"],
      }, 
      maritalStatus: {
        type: String, 
        lowercase: true, 
      }, 
      role: {
        type: String, 
        enum: ["admin", "employee"],
      }, 
      phoneNumber: {
        type: String,
        vaidate(value) {
          if (!validator.isMobilePhone(value, "ar-EG")) {
            throw new Error("invalid phone Numbers");
          }
        },
      },
    status: {
      type: Boolean,
      default:false
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        vaidate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("invalid Email");
          }
        },
      },
      password: {
        type: String,
        trim: true,
        required: true, 
      },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true } 
);
userSchema.virtual("myVacations", {
  ref: "Vacation",
  localField: "_id",
  foreignField: "userId",
});
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 8);
  }
});
userSchema.statics.loginUser = async (email, password) => {
  const userData = await User.findOne({ email });
  if (!userData) throw new Error("invalid Email");
  const validatePassword = await bcryptjs.compare(password, userData.password);
  if (!validatePassword) throw new Error("invalid password");
  return userData;
};
userSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  delete data.password;
  delete data.tokens;
  return data;
};
userSchema.methods.generateToken = async function () {
  const userData = this;
  const token = jwt.sign({ _id: userData._id }, process.env.tokenPass); 
  userData.tokens = userData.tokens.concat({ token });
  await userData.save();
  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
