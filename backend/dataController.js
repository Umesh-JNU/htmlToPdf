const { userModel, dataModel } = require("./dataModel");
const catchAsyncErrors = require("./utils/catchAsyncError");
const ErrorHandler = require("./utils/errorHandler");

// register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await userModel.create({ name, email, password });

  sendToken(user, 200, res);
});

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please enter your email and password", 400));

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid email or password!", 401));

  sendToken(user, 200, res);
});

// logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: false,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.dataSubmit = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const { number, name, id } = req.body;

  const user = await userModel.findById(id);
  if (!user) {
    return next(new ErrorHandler("User with this id is not found", 400));
  }

  console.log(user);
  const data = await dataModel.create({
    number,
    name,
    user: {
      _id: user._id,
      name: user.name,
    },
  });
  console.log(data);
  res.status(200).json({
    success: true,
    data,
  });
});

exports.getAllData = catchAsyncErrors(async (req, res, next) => {
  const data = await dataModel.find();
  res.status(200).json({
    success: true,
    data,
  });
});

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
