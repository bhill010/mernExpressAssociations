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
  })
}
