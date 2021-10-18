const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  
  content: {
    type: String,
    required: [true, "Please fill out your tweet"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    },
  tweet: {
    type: mongoose.Types.ObjectId,
    ref: "Tweet",
    required: true,
  }

}, 
 {
  timestamps: true,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;