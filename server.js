/* === External Modules === */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Security modules
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");

/* === Internal Modules === */
const controller = require("./controllers");
require("./config/db.connection");

/* === System Variables === */

const app = express();
const PORT = process.env.PORT;


/* === System Configuration === */

app.use(express.urlencoded({extended: false}))

app.set("view engine", "ejs");

app.use(express.static("public"));

//Session config to create cookies
app.use(session({
  store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // two days
  }
}));

/* === Middleware === */

app.use(mongoSanitize());

app.use(morgan("dev"));

app.use(rateLimit({
  windowMS: 1000 * 60 * 60,
  max: 1000,
  message: "Please try again later or contact the system admin for more requests.",
}));


/* === Routes === */

// Home

app.get("/", function (req, res) {
    res.render("index");
});


// Authentication

app.use("/", controller.auth);


// == utility routes

app.get("/*", function (req, res) {
    const context = { error: req.error };
    res.render("404", context);
  });


/* === Server Listener === */
app.listen(PORT, function () {
    console.log(`Listening for client requests on port ${PORT} ❤️`);
  });