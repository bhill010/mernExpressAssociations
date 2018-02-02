const mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
const Credential = require("../models/credential");
const passport = require("passport");


module.exports = (app) => {
  app.post("/register", function(req, res) {
    Credential.register(new Credential({ username: req.body.username}), req.body.password, function(err, credential){
      if(err) {
        console.log(err);
      }
      passport.authenticate("local")(req, res, function(){
        res.send("Success register")
        res.send(credential)
      })
    })
  })
}
