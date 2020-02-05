const UserSession = require("../../../models/UserSession");

module.exports = app => {
  app.get("/api/auth/logout", (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: { isDeleted: true }
      },
      null,
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error.",
            error: err
          });
        } else {
          return res.send({
            success: true,
            message: "Logged out (session isDeleted=true)"
          });
        }
      }
    );
  });
};
