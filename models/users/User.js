<<<<<<< HEAD
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    subscriptions: {
      type: [String],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
=======
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subscriptions: {
        type: [String]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
>>>>>>> a0b2302f5bd37f528b56261fb8a71414148ec085

const User = mongoose.model("User", userSchema);
module.exports = User;
