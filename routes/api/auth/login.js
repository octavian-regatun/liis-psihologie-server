const _ = require("lodash");

const User = require("../../../models/User");
const UserSession = require("../../../models/UserSession");

module.exports = app => {
  app.post("/api/auth/login", (req, res, next) => {
    let { body } = req;
    let { username, password } = body;

    // validate

    if (!username) {
      return res.send({
        success: false,
        message: "Error: Username cannot be blank."
      });
    }

    if (_.includes(username, " ")) {
      return res.send({
        success: false,
        message: "Error: Username cannot contain whitespace."
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }

    username = username.trim();

    // password = password.trim();

    // search for users in db with that username

    let foundUser;

    User.find({ username: username }, (err, foundUsers) => {
      // if error
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error.",
          error: err
        });
      }
      // if exactly one user was found with this username (only one must be found)
      if (foundUsers.length == 1) {
        foundUser = foundUsers[0];
        // if password is correct / when you log in
        if (foundUser.validPassword(password)) {
          let userSession = new UserSession();
          userSession.userId = foundUser._id;
          userSession.save((err, doc) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error: Server error.",
                error: err
              });
            } else {
              return res.send({
                success: true,
                message: "Valid log in",
                token: doc._id,
              });
            }
          });

          // if password is incorrect
        } else {
          return res.send({
            success: false,
            message: "The password is incorrect"
          });
        }
      }
      // if no user was found
      else if (foundUsers.length == 0) {
        return res.send({
          success: false,
          message: "Error: Account doesn't exist."
        });
      }
    });
  });
};
