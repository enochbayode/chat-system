const express = require("express");
const chatrouter = express.Router();
const chat = require("../controllers/chat");
const { Auth } = require("../middlewares/auth");
const auth = new Auth();

chatrouter.get("/:userId", auth.tokenRequired, chat.getConversations);
chatrouter.post("/conversation", auth.tokenRequired, chat.conversate);

module.exports = { chatrouter };