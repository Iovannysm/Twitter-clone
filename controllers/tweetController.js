const express = require("express");

 
const router = express.Router();
const { Tweet, User, Comment } = require("../models");

router.use(require("../utils/authRequired"));

// === Index
router.get("/", async function (req, res, next){
  try {
    
    let query = {};

    if (req.query.q) {
      query = {
        $or: [
          {
            content: {
              $regex: req.query.q,
              $options: "i",
            }
          },
        ]
      };
    };

    const allTweets = await Tweet.find(query).populate("user").sort("-createdAt");
    const allComments = await Comment.find({tweet: req.params.id}).populate("user").sort("-createdAt");
    const allUsers = await User.find({});
          const context = {
          tweets: allTweets,
          users: allUsers,
          comment: allComments,
          }
      return res.render("tweet/index", context);
  } catch (error) {
      console.log(error);
      req.error = error;
      next();
  } 
  
});

// Show
router.get("/:id", async function (req, res, next) {
  try {

    let query = {};

    if (req.query.q) {
      query = {
        $or: [
          {
            content: {
              $regex: req.query.q,
              $options: "i",
            }
          },
        ]
      };
    };

    const tweet = await Tweet.findById(req.params.id).populate("user");
    const allComments = await Comment.find(
      { $and: 
        [
          {
            tweet: req.params.id
          },
          query
        ]
      })
    .populate("user")
    .sort("-createdAt");
    const allUsers = await User.find({});  
    const context = {
      tweet: tweet,
      comments: allComments,
      users: allUsers,
      }
    return res.render("tweet/show", context);
  } catch (error) {
      console.log(error);
      req.error = error;
      next();
    }
  
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