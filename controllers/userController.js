const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// base url === /user

// Show User Information
router.get("/:id", async function(req, res, next){

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

router.put("/:id", function (req, res, next){
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true},
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
    await User.findByIdAndDelete(req.params.id);
    return res.redirect("/");

  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }

});

module.exports = router;







