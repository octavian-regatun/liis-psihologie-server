const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://bengo:gibon923@liis-psihologie-mw2is.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

const db = mongoose.connection;

module.exports = db;
