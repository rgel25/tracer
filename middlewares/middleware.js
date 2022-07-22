const ExpressError = require("./utils/ExpressError");

// CHECK IF A USER IS **NOT AUTHENTICATED**
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in first!");
    return res.redirect("/auth/login");
  }
  // CHECK IF USER ROLE === UNASSIGNED
  // REDIRECT TO NEWUSER PAGE AFTER LOGIN
  if (req.user.role === "unassigned") {
    return res.redirect("/newUser");
  }
  //  PROCEED TO NEXT MIDDLEWARE
  next();
};

// CHECK IF A USER IS **ALREADY AUTHENTICATED**
// IF USER IS ALREADY LOGGED IN, HIDE REGISTRATION, LOGIN, AND LANDING PAGE
// THEN REDIRECT THEM TO DASHBOARD
module.exports.alreadyLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  //  PROCEED TO NEXT MIDDLEWARE
  next();
};
