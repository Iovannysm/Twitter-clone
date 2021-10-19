const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// base url === /

// Create user

router.post("/", async function(req, res, next) {
  try {
    const userDoesExist = await User.exists({email: req.body.email});

    if (userDoesExist) {
      return res.redirect("/");
    }
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(req.body.password, salt);

    req.body.password = hash;

    await User.create(req.body);

    return res.redirect("/tweet");

  } catch (error) {
      console.log(error);
      req.error = error;
      return next();
  }
});


// Authenticate user
router.post("/", async function (req, res, next) {
  try{
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.redirect("/");
    }

    const match = await bcrypt.compare(req.body.password, foundUser.password);

    if (!match){
      return res.send("Email or password invalid.");
    }

    req.session.currentUser = {
      id: foundUser_id,
      username: foundUser.username,
    }
    return res.redirect("/tweet");

  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
})

// Log out
router.get("/logout", async function (req, res, next) {
  try {
    await req.session.destroy();
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});


module.exports = router;