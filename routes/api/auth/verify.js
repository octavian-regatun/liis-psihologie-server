const UserSession = require("../../../models/UserSession");

module.exports = app => {
  app.get("/api/auth/verify", (req, res, next) => {
    const { query } = req;
    const tokenQuery =query.token;

    UserSession.find(
      {
        token: tokenQuery
      },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error.",
            error: err
          });
        } 
        else{
          if(sessions.length==0){
            return res.send({
              success: false,
              message: "Invalid token / session cannot be found.",
            });
          }
          else if (sessions.length==1){
            return res.send({
              success: true,
              message: "Valid token.",
            });
          }
        }
      }
    );
  });
};
