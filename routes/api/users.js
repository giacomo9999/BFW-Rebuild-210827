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

  // Check validation
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "E-mail already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // Hash password before saving to database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save();
        });
      });
    }
    return res.status(400).json({ message: "User successfully registered." });
  });
});

// @route POST api/users/login
// @desc login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  console.log("Login attempt", req.body);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "E-mail not found" });
    }
    console.log(password, user.password);
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      console.log("isMatch: ", isMatch);
      if (isMatch) {
        const payload = { id: user.id, name: user.name };
        // Sign token
        jwt.sign(
          payload,
          process.env.SECRETORKEY,
          { expiresIn: 31556926 },
          (err, token) => {
            res.json({
              message: "User successfully logged in.",
              success: true,
              token: "Bearer" + token,
            });
          }
        );
      } else {
        res.status(400).json({ passwordIncorrect: "Password Incorrect" });
      }
    });
  });
});

module.exports = router;
