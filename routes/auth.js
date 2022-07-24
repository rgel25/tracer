const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const { alreadyLoggedIn } = require("../middlewares/middleware");

router.get("/login", alreadyLoggedIn, auth.renderLoginForm);
router.get("/signup", alreadyLoggedIn, auth.renderSignupForm);

router.post("/signup", auth.signup);

router.get("/newUser", auth.renderNewUser);

router.post(
  "/login",
  //loggedin,
  auth.login
);

router.get("/logout", auth.logout);

module.exports = router;
