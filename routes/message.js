const express = require("express");
const messagerouter = express.Router();
const message = require("../controllers/message");
const { Auth } = require("../middlewares/auth");
const auth = new Auth();

messagerouter.post("/send-msg", auth.tokenRequired, message.sendMessage);


module.exports = { messagerouter };