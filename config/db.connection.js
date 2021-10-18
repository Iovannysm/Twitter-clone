const mongoose = require("mongoose");

// for env file
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

// connection listeners
mongoose.connection.on("connected", function () {
  console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected`);
});

mongoose.connection.on("error", function () {
  console.log(`[${new Date().toLocaleTimeString()}] - MongoDB error`);
});

mongoose.connection.on("disconnected", function () {
  console.log(`[${new Date().toLocaleTimeString()}] - MongoDB disconnected`);
});