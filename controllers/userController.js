const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, Tweet, Comment } = require("../models");

// base url === /user

router.use(require("../utils/authRequired"));

router.get("/",  function(req, res, next) {
  res.redirect(`/user/${req.session.currentUser.id}`);
});


// Show User Information
router.get("/:id", function(req, res, next){

    User.findById(req.params.id, function (error, foundUser){
      if (error) {
        req.error = error;
        return next();
      }
      const context = {
        user: foundUser,
      }
      res.render("user/userInfo", context);
    })

});


// Edit User Show Page

router.get("/:id/edit", function(req, res, next){

    User.findById(req.params.id, function (error, foundUser){
      if (error) {
        req.error = error;
        return next();
      }
      const context = {
        user: foundUser,
      }
      res.render("user/editUser", context);
    });
});

// Update User in Database

router.put("/:id", async function (req, res, next){

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(req.body.password, salt);

  req.body.password = hash;

  User.findByIdAndUpdate(
    req.params.id,
    req.body, 
    { new: true },
    function (error, updatedUser){
      if (error) {
        console.log(error);
        req.error = error;
        return next();
      }
      res.redirect(`/user/${req.params.id}`);
    }
  )
})


// Delete User

router.delete("/:id", async function(req, res, next){

  try {
    await Comment.deleteMany({user: req.params.id});
    await Tweet.deleteMany({user: req.params.id});
    await User.findByIdAndDelete(req.params.id);
    return res.redirect("/");


  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }

});

module.exports = router;







