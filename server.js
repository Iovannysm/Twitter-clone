/* === External Modules === */
const express = require("express");
const methodOverride = require("method-override");


/* === Internal Modules === */
const controller = require("./controllers")

/* === System Variables === */

const app = express();
const PORT = process.env.PORT;


/* === System Configuration === */



app.set("view engine", "ejs");

app.use(express.static("public"));

/* === Middleware === */

/* === Routes === */

// Home

app.get("/", function (req, res) {
    res.redirect("/")
});



// == utility routes

app.get("/*", function (req, res) {
    const context = { error: req.error };
    res.render("404", context);
  });


/* === Server Listener === */
app.listen(PORT, function () {
    console.log(`Listening for client requests on port ${PORT} ❤️`);
  });