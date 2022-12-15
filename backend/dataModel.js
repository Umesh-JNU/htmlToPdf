const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    select: false,
  },
  role: {
    type: String,
    defualt: "user",
  },
});

// hashing password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 11);
});

// token for cookie
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const dataSchema = new mongoose.Schema({
  token: {
    type: Number,
    unique: true,
  },
  user: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
    }),
    required: true,
    select: false,
  },
  number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

autoIncrement.initialize(mongoose.connection);
dataSchema.plugin(autoIncrement.plugin, {
  model: "Data",
  field: "token",
  startAt: 10001,
});

const userModel = mongoose.model("User", userSchema);
const dataModel = mongoose.model("Data", dataSchema);

module.exports = {
  userModel,
  dataModel,
};
