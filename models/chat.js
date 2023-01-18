const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: true,
        },
        receiver: {
            type: String,
            required: true,
        },
        lastMessageSent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "message",
        },
    },
    {
        timestamps: true,
    }
);

const MessageModel = mongoose.model("Chat", chatSchema);

module.exports = MessageModel;
