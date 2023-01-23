const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
        required: true,
      },
      message: {
        type: String,
        required: true
      },
      senderName: {
        type: String,
        // required: true
      },
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
      },
      hasRead: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model('conversation', conversationSchema);

module.exports = { Conversation };
