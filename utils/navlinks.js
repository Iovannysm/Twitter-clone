const routes = [
    {
        href: "/tweets",
        title: "Home",
    },
    {
        href: "/tweets",
        title: "Tweets",
    },
    {
        href: "/user",
        title:"Account",

    },
];

const authRoutes = [
    {
        href: "/login",
        title: "Login",
    },
    {
        href: "/register",
        title: "Register",
    },
   
];

const {User} = require("../models");

module.exports = async function navLinks(req, res, next) {
    if (req.session.currentUser) {
      res.locals.routes = routes;
      res.locals.user = await User.findById(req.session.currentUser.id);
    } else {
      res.locals.routes = authRoutes;
    }
  
    next();
  };