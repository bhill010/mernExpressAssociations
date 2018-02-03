const mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
const Credential = require("../models/credential");
const passport = require("passport");


module.exports = (app) => {
  app.post("/api/register", function(req, res) {
    console.log("req:", req.body);
    Credential.register(new Credential({ username: req.body.username}), req.body.password, function(err, credential){
      if(err) {
        console.log(err);
        // return;
      }
      passport.authenticate("local")(req, res, function(){
        console.log("Success register")
        res.send(credential)
      })
    })
  });


  app.post("/api/login", function(req, res, next) {
    passport.authenticate("local", function(err, credential, info) {
      if (err) { return next(err); }
      if (!credential) { res.send("not existing user")};
      req.logIn(credential, function(err) {
        if (err) { return next(err); }

        res.send("login success")
      })
    })(req, res)
  });

  // app.post("/api/login", function(req, res, next) {
  //   console.log("login req:", req.body);
  //   passport.authenticate("local", function(err, credential, info) {
  //     console.log("login api hit");
  //     if (err) return next(err);
  //     if (!credential) {
  //       res.send({ success: false, message: info.message })
  //     }
  //     req.logIn(credential, function(loginErr) {
  //       if (loginErr) {
  //         res.send({ success: false, message: loginErr })
  //       } else {
  //         res.send({ success: true, message: "authentication succeeded" })
  //       }
  //     })
  //   })
  // })
}
