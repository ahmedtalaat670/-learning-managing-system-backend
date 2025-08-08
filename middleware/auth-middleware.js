const jwt = require("jsonwebtoken");

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: "Something went wrong",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyToken(token, "JWT_SECRET");
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
};

module.exports = authenticate;
