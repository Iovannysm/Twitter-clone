const mongoose = require("mongoose");

// for env file
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

// connection listeners
mongoose.connection.on("connected", function () {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `[${new Date().toLocaleTimeString()}] - MongoDB connected ... 🙌 🙌 🙌`
  ); // blu
});

mongoose.connection.on("error", function () {
  console.log("\x1b[31m%s\x1b[0m", "MongoDB connection error 😥", error);
});

mongoose.connection.on("disconnected", function () {
  console.log("\x1b[33m%s\x1b[0m", "MongoDB disconnected  ⚡️ 🔌 ⚡️");
});