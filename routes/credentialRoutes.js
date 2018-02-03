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
        res.status(401).send(err)
      } else {
        passport.authenticate("local")(req, res, function(){
          console.log("Success register")
          res.send(credential)
        })
      }
    })
  });


  app.post("/api/login", function(req, res, next) {
    passport.authenticate("local", function(err, credential, info) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        // return next(err);
      } else if (!credential) {
        res.status(401).send("Not existing user")
      } else {
        req.logIn(credential, function(err) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
            // return next(err);
          } else {
            console.log("Success login")
            res.send(credential)
          }
        })
      }
    })(req, res)
  });

  app.get("/api/logout", function(req, res) {
    req.logout();
    res.redirect("/users");

    // res.send("logged out")
  })

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
