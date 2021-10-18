const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a valid e-mail address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"]
  },
  avatar: {
    type: String,
    default: "https://i.imgur.com/QWC8H7W.png", 
  }  
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;