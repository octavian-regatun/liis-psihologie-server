const _ = require("lodash");

const User = require("../../../models/User");

module.exports = app => {
  app.post("/api/account/signup", (req, res, next) => {
    let { body } = req;
    let { username, firstName, lastName, email, password } = body;

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

    if (!firstName) {
      return res.send({
        success: false,
        message: "Error: First name cannot be blank."
      });
    }

    if (!lastName) {
      return res.send({
        success: false,
        message: "Error: Last name cannot be blank."
      });
    }

    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }

    username = username.trim();

    firstName = firstName.trim();

    lastName = lastName.trim();

    email = email.toLowerCase();
    email = email.trim();

    // password = password.trim();

    // verify email, username doesn't exist

    User.find({ email: email, username: username }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error.",
          error: err
        });
      } else if (previousUsers.length > 0) {
        console.log(previousUsers);
        return res.send({
          success: false,
          message: "Error: Account already exists."
        });
      }

      // save the new user

      let newUser = new User();

      newUser.username = username;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);

      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error.",
            error: err
          });
        }
        return res.send({
          success: true,
          message: "Signed up"
        });
      });
    });
  });
};
