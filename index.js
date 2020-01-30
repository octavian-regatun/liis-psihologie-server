const { port } = require("./config/config");
const express = require("express");
const http = require("http");
const app = express();
const bcrypt = require("bcrypt");

const server = http.Server(app);

server.listen(port, function() {
  console.log("Chat server running");
});
