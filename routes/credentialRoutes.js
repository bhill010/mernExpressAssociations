const mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
const Credential = require("../models/credential");

module.exports = (app) => {
  app.post("/register", function(req, res) {
    res.send("register post route")
  })
}
