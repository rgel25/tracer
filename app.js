// DETERMINE IF IN PRODUCTION OR DEV ENV
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// --------------------- START OF IMPORTS ---------------------
// INITIALIZE EXPRESS AND RELATED TOOLS
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
// CHOOSE PRODUCTION OR DEVELOPMENT PORT
const port = process.env.PORT || 8080;
// REQUIRE SEQUELIZE DB SYNC
const db = require("./models");
// DB PRODUCTION? NEEDS RESEARCH
// const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/yelp-camp";
// REQUIRE CUSTOM EXPRESS ERROR HANDLER
const ExpressError = require("./utils/ExpressError");
// REQUIRE PASSPORT
const passport = require("passport");
require("./config/passport")(passport);
// REQUIRE ROUTES
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const projectRoutes = require("./routes/project");
const ticketRoutes = require("./routes/ticket");
const userRoutes = require("./routes/user");
// REQUIRE CUSTOM MIDDLEWARE
const { alreadyLoggedIn } = require("./middlewares/middleware");
// REQUIRE HELPERS
const { rolePrint, formatName, formatDate } = require("./utils/helpers");
// REQUIRE SESSION STORE
const MongoStore = require("connect-mongo");
// --------------------- END OF IMPORTS ---------------------

// --------------------- START OF TEMPLATING TOOLS ---------------------
// USE EJS AS VIEW ENGINE, EJSMATE AS EJS TEMPLATER AND VIEWS FOLDER
// AS DEFAULT VIEW PAGES DESTINATION
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// --------------------- END OF TEMPLATING TOOLS ---------------------

// --------------------- START OF APP (GENERAL) MIDDLEWARES ---------------------
// PARSE APPLICATION/X-WWW-FORM_URLENCODED
app.use(express.urlencoded({ extended: true }));
// PARSE INCOMING REQUEST OBJ AS JSON OBJ
app.use(express.json());
// METHOD OVERRIDE FOR REST IMPLEMENTATION (PUT/PATCH, DELETE, ETC...)
app.use(methodOverride("_method"));
// USE PUBLIC FOLDER AS DEFUALT DESTINATION OF ASSETS
app.use(express.static(path.join(__dirname, "public")));
// --------------------- END OF APP (GENERAL) MIDDLEWARES ---------------------

// --------------------- START OF SESSION/SESSION CONFIG---------------------
// DEFINE A SECRET PHRASE FOR SESSION CONFIG
const secret = process.env.SECRET || "thisshouldbeabettersecret";
// STORE STRATEGY FOR EXPRESS SESSION
const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URL,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

store.on("error", (e) => {
  console.log("Session Store Error!", e);
});

// SESSION CONFIGURATION
// SOME PROPERTIES ARE COMMENTED DUE TO STORE BEING UNDEFINED FOR NOW
const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  // secure: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
// USE EXPRESS SESSION MIDDLEWARE WITH SESSION CONFIG ABOVE
app.use(session(sessionConfig));
// USE FLASH MIDDLEWARE (FOR ERROR/SUCCESS MESSAGES)
app.use(flash());
// PASSPORT SESSION INITIALIZE
app.use(passport.initialize());
// PERSISTENT LOGIN SESSIONS THROUGH PASSPORT
app.use(passport.session());
// --------------------- END OF SESSION/SESSION CONFIG---------------------

// START OF HELPERS
app.locals.rolePrint = rolePrint;
app.locals.formatName = formatName;
app.locals.formatDate = formatDate;
// END OF HELPERS

// --------------------- START OF LOCAL RESPONSE VARIABLES---------------------
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
// --------------------- END OF LOCAL RESPONSE VARIABLES---------------------

// --------------------- START OF ROUTING ---------------------
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/dashboard/user", userRoutes);
app.use("/dashboard/projects", projectRoutes);
app.use("/dashboard/ticket", ticketRoutes);
// --------------------- END OF ROUTING ---------------------

// --------------------- START OF HOME PAGE ROUTING ---------------------
app.get("/", alreadyLoggedIn, (req, res) => {
  // console.log(req.user);
  res.render("pages/landing");
});
// --------------------- END OF HOME PAGE ROUTING ---------------------

// --------------------- START OF ERROR HANDLER ---------------------
// CATCH WILDCARD URLS AND CREATE ERROR
app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});
// CUSTOM ERROR HANDLER FOR EXPRESS
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong...";
  res.status(statusCode).render(`error`, { err });
});
// --------------------- END OF ERROR HANDLER ---------------------

// --------------------- Start OF SERVER AND DB INIT ---------------------
// INITIALIZE DB AND SERVER
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
// --------------------- END OF SERVER AND DB INIT ---------------------
