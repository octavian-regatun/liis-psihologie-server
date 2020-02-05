const { port } = require("./config/config");
const express = require("express");
const http = require("http");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/connect");
const app = express();

const server = http.Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hi");
});

require("./routes/api/auth/signup")(app);
require("./routes/api/auth/login")(app);
require("./routes/api/auth/verify")(app);
require("./routes/api/auth/logout")(app);


db.on("error", console.error.bind(console, "MongoDB connection error:"));

server.listen(port, function() {
  console.log("Server running");
});
