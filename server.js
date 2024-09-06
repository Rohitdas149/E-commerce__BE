/**
 * starting file of the project
 */
// server chahiye
const express = require("express");
// DB chahiye
const mongoose = require("mongoose");
// to start the server
const app = express();
// to link server config file
const server_config = require("./configs/server.config");
// to link with db config file
const db_config = require("./configs/db.config");
// to link with db user model file
const user_model = require("./models/user.model");

/**
 * to encrypt the password -> bcryptjs
 * using hash function
 */
const bcrypt = require("bcryptjs");
app.use(express.json()); //middleware -> json code convert -> js
/**
 * Create an admin user at the starting of the Applicattion
 * if not already
 */
// Connect with mongoDb
mongoose.connect(db_config.DB_URL);
const db = mongoose.connection;
/*
 * error handling
 */
db.on("error", () => {
  console.log("Error while connecting to the mongoDB");
});

db.once("open", () => {
  console.log("Connected to MongoDB");
  init();
});

async function init() {
  try {
    let user = await user_model.findOne({ userId: "admin" });

    if (user) {
      console.log("Admin is already present");
      return;
    }
  } catch (err) {
    console.log("Error while reading the data", err);
  }

  try {
    user = await user_model.create({
      name: "Rohit",
      userId: "admin",
      email: "rohitdev@gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("Devil", 8),
    });
    console.log("Admin created ", user);
  } catch (err) {
    console.log("Error while create admin", err);
  }
}

/**
 * Stich the route to the server
 */

require("./routes/auth.routes")(app);
require("./routes/category.routes")(app);
/**
 * Start the server
 */
app.listen(server_config.PORT, () => {
  console.log("Server started at port num : ", server_config.PORT);
});
