const express = require("express");

 
const router = express.Router();
const { Tweet, User, Comment } = require("../models");

router.use(require("../utils/authRequired"));

// === Index
router.get("/", async function (req, res, next){
  try {
    
    const allTweets = await Tweet.find({}).populate("user").sort("-createdAt");
    const allComments = await Comment.find({tweet: req.params.id}).populate("user").sort("-createdAt");
    const allUsers = await User.find({});
          const context = {
          tweets: allTweets,
          users: allUsers,
          comment: allComments,
          }
          console.log(context);
      return res.render("tweet/index", context);
  } catch (error) {
      console.log(error);
      req.error = error;
      next();
  } 
  
});


// Show
router.get("/:id", function (req, res, next) {
    Tweet.findById(req.params.id, function (error, tweet) {
      if (error) {
        req.error = error;
        return next();
      }

      Comment.find({tweet: tweet.id}, function (error, foundComment) {
        if (error) {
          req.error = error;
          return next();
        }
        
        const context = {
          tweet,
          comments: foundComment,
          
        };
        return res.render("tweet/show", context);
      })
    });
});


// Create
router.post("/", function (req, res, next) {
    const data = req.body;
    data.user = req.session.currentUser.id;
   
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



//Delete
router.delete("/:id", function(req, res, next) {
  
    Tweet.findByIdAndDelete(req.params.id, function (error, deletedTweet) {
        if (error) {
          console.log(error);
          req.error = error;
          return next();
        }

        res.redirect("/tweets");
    });
});

module.exports = router;