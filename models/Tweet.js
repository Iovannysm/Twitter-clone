const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
    
    
    content: {
        type: String,
        required: [true, "The field can not be empty."],
      },
      
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },

}, 
    {
    timestamps: true,
    }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;