const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;
  const existingUser = await User.findOne({
    $or: [{ userName }, { userEmail }],
  });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "There is another user with the same userName or userEmail",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    userEmail,
    password: hashPassword,
    role,
  });
  await newUser.save();
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};

const logInUser = async (req, res) => {
  const { userEmail, password } = req.body;
  const checkUser = await User.findOne({ userEmail });
  if (!checkUser) {
    res.status(401).json({
      success: false,
      message: "There is no user with this email",
    });
  }
  if (!(await bcrypt.compare(password, checkUser.password))) {
    res.status(401).json({
      success: false,
      message: "The Password is wrong",
    });
  }
  const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
    },
    "JWT_SECRET",
    { expiresIn: "120m" }
  );
  res.status(200).json({
    success: true,
    message: "The process is done successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
    },
  });
};

module.exports = { registerUser, logInUser };
