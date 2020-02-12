const UserSession = require("../../../models/UserSession");
const User = require("../../../models/User");

module.exports = app => {
  app.get("/api/account/role", (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find(
      {
        token: token
      },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error.",
            error: err
          });
        } else if (sessions.length == 0) {
          return res.send({
            success: false,
            message: "Invalid token / session cannot be found."
          });
        } else if (sessions.length == 1) {
          const session = sessions[0];
          console.log(session);
          User.findById(session.userId, (err, user) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error: Server error.",
                error: err
              });
            } else {
              return res.send({
                success: true,
                message: "User found.",
                role: user.role
              });
            }
          });
        }
      }
    );
  });
};
