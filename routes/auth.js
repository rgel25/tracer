const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.get("/login", auth.renderLoginForm);
router.get("/signup", auth.renderSignupForm);

router.post("/signup", auth.signup);

router.get("/newUser", auth.renderNewUser);

router.post(
  "/login",
  //loggedin,
  auth.login
);

router.get("/logout", auth.logout);

module.exports = router;
