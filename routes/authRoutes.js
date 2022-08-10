const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authController")

// FOR REGISTRATION 
router
  .route('/signup')
  .post(authControllers.register);

// FOR SIGNING IN
router
  .route('/login')
  .post(authControllers.login);

// FOR FORGET PASSWORD
router
  .route('/forgetPassword')
  .post(authControllers.forgetPassword)

// FOR RESETING PASSWORD
router
  .route('/reset-password')
  .get(authControllers.reset_password)

router
  .route('/logout')
  .get(authControllers.logout)

module.exports = router;