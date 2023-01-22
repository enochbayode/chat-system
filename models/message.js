const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
      _id: mongoose.Schema.Types.ObjectId,
      convId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'conversation',
      },
      messages: [
        {
          dateTime: {
            type: Date,
            require: true,
            default: Date.now,
          },
          message: {
            type: String,
          },
          media: [
            {
              type: String,
            },
          ],
          senderName: {
            type: String,
          },
          // senderImage: {
          //   type: String,
          // },
          senderId: {
            type: mongoose.Schema.Types.ObjectId,
          },
        },
      ],
    },
    { timestamps: true }
  );

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message };
