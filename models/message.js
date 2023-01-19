const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
