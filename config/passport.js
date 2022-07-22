const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (email, password, done) => {
        // Match user (email)
        db.user
          .findOne({ where: { email: email } })
          .then((user) => {
            // Check if user exists
            if (!user) {
              return done(null, false, {
                errorMsg: "Email or password is incorrect",
              });
            }
            //   Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, {
                  errorMsg: "Email or password is incorrect",
                });
              }
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );

  //serialize
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function (id, done) {
    db.user.findOne({ where: { id: id } }).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};
