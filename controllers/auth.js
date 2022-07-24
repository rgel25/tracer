const db = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

// RENDER SIGN UP FORM
module.exports.renderSignupForm = (req, res) => {
  res.render("pages/auth/signup");
};

// RENDER NEW USER MESSAGE PAGE
module.exports.renderNewUser = (req, res) => {
  res.render("pages/auth/newUser");
};

// RENDER LOGIN FORM
module.exports.renderLoginForm = (req, res) => {
  res.render("pages/auth/login");
};

// SIGNUP CONTROLLER
module.exports.signup = async (req, res) => {
  // EXTRACT FORM DATA FROM REQUEST BODY
  const { firstName, lastName, email, password, password2 } = req.body;
  const errors = [];
  // Check all required fields
  if (!firstName || !lastName || !email || !password) {
    errors.push({ errorMsg: "Please fill in all fields." });
  }
  // Check if passwords match
  if (password !== password2) {
    errors.push({ errorMsg: "Passwords do not match." });
  }
  // Check passwords length
  if (password.length < 6) {
    errors.push({ errorMsg: "Passwords should at least be 6 characters." });
  }
  if (errors.length > 0) {
    // VALIDATION FAIL
    req.flash(
      "error",
      errors.map((err) => err.errorMsg)
    );
    res.redirect("/auth/signup");
  } else {
    // VALIDATION PASS
    // Check for duplicate emails
    const user = await db.user.findOne({ where: { email: email } });
    if (user === null) {
      // If NO duplicate email, create new user
      // Hash password first using Bcrypt
      bcrypt.genSalt(12, (err, salt) =>
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          db.user
            .create({
              first_name: firstName.trim().toLowerCase(),
              last_name: lastName.trim().toLowerCase(),
              email: email.trim().toLowerCase(),
              password: hash,
            })
            .then(() => {
              return res.redirect("/auth/newUser");
            });
        })
      );
    } else {
      errors.push({
        errorMsg: "Sorry, a user with the same email address already exists",
      });
      req.flash(
        "error",
        errors.map((err) => err.errorMsg)
      );
      res.redirect("/auth/signup");
    }
    // return res.send("passed");
  }
};

module.exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      req.flash("error", info.errorMsg);
      res.redirect("/auth/login");
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.redirect("/dashboard");
      });
    }
  })(req, res, next);
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/");
  });
};
