const express = require("express");

 
const router = express.Router();
const { Comment } = require("../models");

router.use(require("../utils/authRequired"));


// Show
router.get("/:id",  function (req, res, next) {

   
    Comment.find(req.params.id, function(error, allComments){
        if (error) {
            req.error = error;
            return next();
        }

        console.log(allComments);
        res.render("/tweets");

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
      const context = {
        data,
        comment: newComment,
      }
      console.log(newComment);
      return res.render("tweet/show", context);
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

        res.redirect(`/tweets/${data.tweet}`);
    });
});

module.exports = router;