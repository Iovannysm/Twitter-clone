const express = require("express");

 
const router = express.Router();
const { Comment } = require("../models");

router.use(require("../utils/authRequired"));


// Show
router.get("/:id", async function (req, res, next) {

    try {
    
        const Tweet = await Tweet.findById(req.params.id).populate("user");
        const allComments = await Comment.find({tweet: req.params.id}).populate("user").sort("-createdAt");
        const allUsers = await User.find({});       
              const context = {
              tweets: Tweet,
              comments: allComments,
              users: allUsers,
              
              }
              console.log(context);
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
   
   Comment.create(data, function (error, newComment) {
      if (error) {
        console.log(error);
        req.error = error;
        return next();
      }
      console.log(newComment);
      res.redirect("/tweet");
  });
});



//Delete
router.delete("/:id", function(req, res, next) {
  
    Comment.findByIdAndDelete(req.params.id, function (error, deletedComment) {
        if (error) {
          console.log(error);
          req.error = error;
          return next();
        }

        res.redirect("/tweet");
    });
});

module.exports = router;