const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

const users = require("./routes/api/users");
// const { initialize } = require("passport");

require("dotenv").config();

const app = express();

const connectToServer = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Server Connected to MongoDB Atlas Database");
  } catch (err) {
    console.log(err);
  }
};

connectToServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.get("/", (req, res) => {
  console.log("Request made to /");
  res.send("Server here");
});

const port = process.env.PORT | 8000;

app.listen(port, () => {
  console.log("Server running on port ", port);
});
