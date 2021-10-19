const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// base url === /



router.get("/login", function(req, res) {
 return res.render("./show");
});

// New

router.get("/register", function(req, res) {
  res.render("auth/register");
});

// Created user

router.post("/register", async function(req, res, next) {
  try {
    const userDoesExist = await User.exists({email: req.body.email});

    if (userDoesExist) {
      return res.redirect("/login");
    }
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(req.body.password, salt);

    req.body.password = hash;

    await User.create(req.body);

    const foundUser = await User.findOne({ email: req.body.email });

    req.session.currentUser = {
      id: foundUser._id,
      username: foundUser.username,
    }

    console.log(foundUser);

    return res.redirect("/logged");

  } catch (error) {
      console.log(error);
      req.error = error;
      return next();
  }
});


// Sign In

router.get("/login", function(req, res) {
  res.render("auth/login");
});


// Authenticate user
router.post("/login", async function (req, res, next) {
  try{
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.redirect("/register");
    }

    const match = await bcrypt.compare(req.body.password, foundUser.password);

    if (!match){
      return res.send("Email or password invalid.");
    }

    req.session.currentUser = {
      id: foundUser._id,
      username: foundUser.username,
    }
    return res.redirect("/logged");

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