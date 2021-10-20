const express = require("express");

 
const router = express.Router();
const { Tweet } = require("../models");

// === Index
router.get("/", function (req, res, next){
    Tweet.find({}, function(error, allTweets) {
        if (error) console.log(error);
            const context = {
            tweets: allTweets,
            };
        return res.render("tweet/index", context);
    });
});


// Show
router.get("/:id", function (req, res, next) {
    

    Tweet.findById(req.params.id, function (error, tweet) {
      if (error) {
        req.error = error;
        return next();
      }
  
        const context = {
          tweet,
          
        };
  
        
        return res.render("tweet/show", context);
    });
});


// Create
router.post("/", function (req, res, next) {
    const data = req.body.content;
   
   Tweet.create(data, function (error, newTweet) {
      if (error) {
        console.log(error);
        req.error = error;
        return next();
      }
      console.log(newTweet);
      res.redirect("/tweets");
  });
});

module.exports = router;