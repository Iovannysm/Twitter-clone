const express = require("express");

 
const router = express.Router();
const { Tweet } = require("../models");


router.get("/", function (req, res, next){
    Tweet.find({}, function(error, allTweets) {
        if (error) console.log(error);
            const context = {
            tweets: allTweets,
            };
        return res.render("/index", context);
    });
});

module.exports = router;