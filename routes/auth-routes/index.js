const express = require("express");
const {
  registerUser,
  logInUser,
} = require("../../controllers/auth-controller/index");
const authenticateMiddleware = require("../../middleware/auth-middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.get("/checkAuth", authenticateMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authentication process is done",
    data: {
      user,
    },
  });
});

module.exports = router;
