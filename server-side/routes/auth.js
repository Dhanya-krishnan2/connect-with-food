const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const Account = require("../models/account");
const authController = require("../controllers/authController");
// we are requiring all the modules needed here
// here we are using express router
const router = express.Router();
// in the sign-up end point  checking various condition here 
// checking for valid email
//if we enter the existing email they will get the primise rejected as "try another email"
router.post(
  "/signup-user",
  [
    body("email", "Please enter a valid email to continue.")
      .isEmail()
      .custom((value, { req }) => {
        return Account.findOne({ email: value }).then((accountDoc) => {
          if (accountDoc) {
            return Promise.reject(
              "Email address already exists, please try again with another email."
            );
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password should be at least 6 characters long")
      .trim()
      .isLength({ min: 6 }),
    body("firstName", "First Name cannot be empty").trim().not().isEmpty(),
    body("lastName", "Last Name cannot be empty").trim().not().isEmpty(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.signupUser
);
// all the other filled they cheching for the condition
// first name cannot be
// last name cannot be empty
// checking for password
router.get("/verify/:token", authController.verifyAccount);
// in here checking for the tokens
router.post("/login", authController.login);
// her login checking all the authentications
router.post(
  "/signup-seller",
  [
    body("email", "Please enter a valid email to continue.")
      .isEmail()
      .custom((value, { req }) => {
        return Account.findOne({ email: value }).then((accountDoc) => {
          if (accountDoc) {
            return Promise.reject(
              "Email address already exists, please try again with another business email."
            );
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password should be at least 6 characters long")
      .trim()
      .isLength({ min: 6 }),
      // here the form is checking validity of the field
    body("name", "Restaurant Name cannot be empty").trim().not().isEmpty(),
    body("payment", "Payment cannot be empty").trim().not().isEmpty(),
    body("tags", "Tags cannot be empty").trim().not().isEmpty(),
    body("street", "Street cannot be empty").trim().not().isEmpty(),
    body("locality", "Locality cannot be empty").trim().not().isEmpty(),
    body("aptName", "Apartment name cannot be empty").trim().not().isEmpty(),
    body("zip", "Zipcode cannot be empty").trim().not().isEmpty(),
    body("costForOne", "Cost for one cannot be empty").trim().not().isEmpty(),
    body("minOrderAmount", "Minimum Order Amount cannot be empty")
      .trim()
      .not()
      .isEmpty(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
    body("phoneNo", "Enter a valid 10 digit phone number")
      .trim()
      .isLength({ min: 10, max: 10 }),
  ],
  authController.signupSeller
);

router.post("/images-test", authController.imagesTest);

module.exports = router;
