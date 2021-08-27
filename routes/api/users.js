const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const user = require("../../models/User");

// @route POST api/users/register
// @desc register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const findOneUser = async () => {
    await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ email: "E-mail already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        const saveUser = async () => {
          try {
            await newUser.save();
            (user) => res.json(user);
          } catch {
            (err) => console.log(err);
          }
        };
        saveUser();
      });
    });
  };

  findOneUser();
});
