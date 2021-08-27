const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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

const port = process.env.PORT | 8000;

app.listen(port, () => {
  console.log("Server running on port ", port);
});
