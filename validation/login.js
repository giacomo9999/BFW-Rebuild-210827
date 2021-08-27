const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string in order to use validator functions
  data.email !== isEmpty(data.email) ? data.email : "";
  data.password !== isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "E-mail field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "E-mail is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
