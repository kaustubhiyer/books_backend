const express = require("express");

const authController = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");
const User = require("../models/user");

const { body } = require("express-validator/check");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    body("email", "Invalid Email Address.")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email already exists. Please enter a new one."
            );
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password must be at least 6 characters and alphanumeric.")
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value === req.body.password) {
          return true;
        }
        throw new Error("Passwords must match.");
      })
      .trim(),
  ],
  authController.postSignup
);

router.post(
  "/login",
  [
    body("email", "Invalid Email Address").isEmail().normalizeEmail(),
    body("password", "Invalid Email or password.")
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/reset", authController.postNewPassword);

module.exports = router;
