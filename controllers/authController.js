const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");
const mongoose = require("mongoose");
const jwtAuth = require("../lib/jwtAuth");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const bcryptjs = require("bcryptjs");
const session = require('express-session');
const cookie = require("cookie-parser");


const User = require("../db/User");
const Buyer = require("../db/Buyer");
const Seller = require("../db/Seller");

///////////////////////////////////////////////////////////////////////   REGISTERING    (POST)
exports.register = (req, res) => {
  const data = req.body;
  let user = new User({
    email: data.email,
    password: data.password,
    type: data.type,
  });

  user
    .save()
    .then(() => {
      const userDetails =
        user.type == "seller"
          ? new Seller({
            userId: user._id,
            name: data.name,
            contactNumber: data.contactNumber,
          })
          : new Buyer({
            userId: user._id,
            name: data.name,
            contactNumber: data.contactNumber,
          });

      userDetails
        .save()
        .then(() => {
          res.json({
            // token: token,
            type: user.type,
          });
        })
        .catch((err) => {
          user
            .delete()
            .then(() => {
              res.status(400).json(err);
            })
            .catch((err) => {
              res.json({ error: err });
            });
          err;
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

///////////////////////////////////////////////////////////////////////   LOGIN    (POST)
exports.login = (req, res, next) => {
  passport.authenticate("local", { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).json({ message: "Unautherized" });
      return;
    }
    // Token
    const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
    res.cookie('access-token', token, {
      maxAge: 60 * 60 * 24 * 30 * 100,
      httpOnly: true,
      //secure: true,
    })
    res.json({
      // token: token,
      type: user.type,
    });
  }
  )(req, res, next);
}

///////////////////////////////////////////////////////////////////////   FORGET AND RESET PASSWORD
// FUNCTION TO SEND MAIL TO YOUR GMAIL ACCOUNT USING NODEMAILER
const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      // service: 'Gmail',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: authKeys.emailUser,
        pass: authKeys.emailPassword,
      }
    })
    const mailOptions = {
      from: authKeys.emailUser,
      to: email,
      subject: "For reset Password",
      html: '<p> Hii ' + name + ', Please copy the link and <a href="http://127.0.0.1:3000/auth/reset-password?token=' + token + '"> reset your password</a>'
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      }
      else {
        console.log("Mail has been sent:- ", info.response)
      }
    })
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message })
  }
}

// FUNCTION TO RETURN HASHED PASSWORD WHICH IS STORED IN DB
const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    res.status(400).send(error.message)
  }
}

// FORGET PASSWORD ROUTE    (POST)
exports.forgetPassword = async (req, res) => {
  try {
    const email = req.body.email
    const userData = await User.findOne({ email: email });
    if (userData) {
      const randomString = randomstring.generate();
      const data = await User.updateOne({ email: email }, { $set: { token: randomString } })
      sendResetPasswordMail(userData.name, userData.email, randomString)
      res.status(200).send({ success: true, msg: "Please check inbox of your mail and reset your password" })
    }
    else {
      res.status(200).send({ success: true, msg: "This email is not exist!" })
    }

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message })
  }
}

// RESET PASSWORD    (GET).
exports.reset_password = async (req, res) => {
  try {
    const token = req.query.token;
    const tokenData = await User.findOne({ token: token })
    if (tokenData) {
      const password = req.body.password;
      const newPassword = await securePassword(password);
      const userData = await User.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: newPassword, token: '' } }, { new: true })
      res.status(200).send({ success: true, msg: "User Password has been reset", data: userData })

    }
    else {
      res.status(200).send({ success: true, msg: "This link has benn expired" })
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message })
  }
}

//logout user

function checkSignIn(req, res, next ){
  if(req.cookie){
      next();     //If session exists, proceed to page
  } else {
      var err = new Error("Not logged in!");
      // console.log(err);
      //next(err);  //Error, trying to access unauthorized page!
      res.status(400).json({title: "unauthorized page", message: "You are unauthorized to open this page"});
  }
};

exports.logout = checkSignIn, async (req,res) => {
  const user = req.cookie;
  res.cookie.clearCookie(user);
      if(err){
          return res.status(400).json ({
              message: "error"
          });
      } else{
          res.status(200).json({
              message: "Logged out",
              username: user
          });
      }
}