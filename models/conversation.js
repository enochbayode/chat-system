const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'user',
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'user',
      },
    ],
    lastMessage: {
      dateTime: {
        type: Date,
        require: true,
      },
      message: {
        type: String,
      },
      senderName: {
        type: String,
      },
      senderImage: {
        type: String,
      },
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      hasRead: {
        type: Boolean,
        require: true,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model('conversation', conversationSchema);

module.exports = { Conversation };
