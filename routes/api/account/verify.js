const UserSession = require("../../../models/UserSession");

module.exports = app => {
  app.get("/api/account/verify", (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
          if(err){
            return res.send({
                success: false,
                message: "Error: Server error.",
                error: err
              });
            }
          if(!sessions){
            return res.send({
                success: false,
                message: "Error: Invalid token / session",
            })
          }
          else if(sessions.length==1){
            return res.send({
                success: true,
                message: "Valid token / session",
            })
          }
      }
    );
  });
};
