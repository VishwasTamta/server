const express = require("express");

const authController = require("../controllers/auth");
const { check, body } = require("express-validator/check");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-mail already exist, please pick a different one."
            );
          }
        });
      }),
    body(
      "password",
      "Please enter a password which only contain numbers and alfabets and should be 5 character long!"
    )
      .isAlphanumeric()
      .trim()
      .isLength({ min: 5 }),
    body("cnfPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password do not match!");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
