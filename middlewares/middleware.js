const ExpressError = require("../utils/ExpressError");

// CHECK IF A USER IS **NOT AUTHENTICATED**
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in first!");
    return res.redirect("/auth/login");
  }
  // CHECK IF USER ROLE === UNASSIGNED
  // REDIRECT TO NEWUSER PAGE AFTER LOGIN
  if (req.user.userRoleRefId === "ur5") {
    return res.redirect("/auth/newUser");
  }
  //  PROCEED TO NEXT MIDDLEWARE
  next();
};

// CHECK IF A USER IS **ALREADY AUTHENTICATED**
// IF USER IS ALREADY LOGGED IN, HIDE REGISTRATION, LOGIN, AND LANDING PAGE
// THEN REDIRECT THEM TO DASHBOARD
module.exports.alreadyLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.userRoleRefId !== "ur5") {
      req.flash("success", "You are already logged in!");
      return res.redirect("/dashboard");
    } else {
      return res.render("pages/auth/login");
    }
  }
  //  PROCEED TO NEXT MIDDLEWARE
  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user.userRoleRefId !== "ur1") {
    req.flash("error", "You are not authorized to access that page");
    return res.redirect("/dashboard");
  }
  next();
};

module.exports.isProjectManager = (req, res, next) => {
  if (req.user.userRoleRefId !== "ur2") {
    req.flash("error", "You are not authorized to access that page");
    return res.redirect("/dashboard");
  }
  next();
};

module.exports.isDeveloper = (req, res, next) => {
  if (req.user.userRoleRefId !== "ur3") {
    req.flash("error", "You are not authorized to access that page");
    return res.redirect("/dashboard");
  }
  next();
};

module.exports.isSubmitter = (req, res, next) => {
  if (req.user.userRoleRefId !== "ur4") {
    req.flash("error", "You are not authorized to access that page");
    return res.redirect("/dashboard");
  }
  next();
};

module.exports.allowedRoles = (roles) => {
  // MAKE SURE TO ENTER AN ARRAY OF ROLE CODES
  // EX. ["ur1", "ur2"]
  return (req, res, next) => {
    if (!roles.includes(req.user.userRoleRefId)) {
      req.flash("error", "You are not authorized to access that page");
      return res.redirect("/dashboard");
    }
    next();
  };
};
