const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    hasRead: {
      type: Boolean,
      require: true,
      default: false,
    },

    category: {
      type: String,
      require: true,
    },

    title: {
      type: String,
      require: true,
    },

    body: {
      type: String,
      require: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },

  },

  { timestamps: true }
);

const Notification = mongoose.model('notification', notificationSchema);

module.exports = { Notification };
