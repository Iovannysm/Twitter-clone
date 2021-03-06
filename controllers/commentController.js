const express = require("express");

 
const router = express.Router();
const { Comment, Tweet } = require("../models");

router.use(require("../utils/authRequired"));


// Show
router.get("/:id",  function (req, res, next) {

   
    Comment.find(req.params.id, function(error, allComments){
        if (error) {
            req.error = error;
            return next();
        }
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
       res.redirect(`tweets/${data.tweet}`);
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