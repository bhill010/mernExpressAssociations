const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const Credential = require("../models/credential");
const passport = require("passport");

module.exports = app => {
  app.post("/api/register", function(req, res) {
    Credential.register(
      new Credential({ username: req.body.username }),
      req.body.password,
      function(err, credential) {
        if (err) {
          console.log(err);
          res.status(401).send(err);
        } else {
          passport.authenticate("local")(req, res, function() {
            console.log("Success register");
            res.send(credential);
          });
        }
      }
    );
  });

  app.post("/api/login", function(req, res, next) {
    passport.authenticate("local", function(err, credential, info) {
      if (err) {
        res.status(500).send(err);
      } else if (!credential) {
        res.status(401).send("Not existing user");
      } else {
        req.logIn(credential, function(err) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(credential);
          }
        });
      }
    })(req, res);
  });

  app.get("/api/logout", function(req, res) {
    req.logout();
    res.send("Complete")
    // res.redirect("/users");
  });
};
