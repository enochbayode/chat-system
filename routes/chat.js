const express = require("express");
const chatrouter = express.Router();
const chat = require("../controllers/chat");
const { Auth } = require("../middlewares/auth");
const auth = new Auth();

messagerouter.post("/send-msg", auth.tokenRequired, message.sendMessage);
messagerouter.get("/last-msg", auth.tokenRequired, message.getLastMessage);

module.exports = { chatrouter };