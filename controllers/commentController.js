const express = require("express");

 
const router = express.Router();
const { Comment } = require("../models");

// === Index
router.get("/", function (req, res, next){
    Comment.find({}, function(error, allComments) {
        if (error) console.log(error);
            const context = {
            tweets: allComments,
            };
        return res.render("tweet/index", context);
    });
});


// Show
router.get("/:id", function (req, res, next) {
    

    Comment.findById(req.params.id, function (error, comment) {
      if (error) {
        req.error = error;
        return next();
      }
  
        const context = {
          comment,
          
        };
  
        
        return res.render("tweet/show", context);
    });
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