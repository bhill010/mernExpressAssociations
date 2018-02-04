const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Credential = require("../models/credential");

module.exports = app => {
  // GET users
  app.get("/users", function(req, res, next) {
    User.find({}, function(err, allUsers) {
      if (err) {
        console.log(err);
      } else {
        res.send(allUsers);
      }
    });
  });

  // CREATE new user
  app.post("/credential/:id/users", function(req, res, next) {
    Credential.findById(req.params.id, function(err, credential) {
      if(err) {
        console.log(err);
      } else {
        const username = req.body.username;

        const user = new User({
          username: username
        });

        User.create(user, function(err, newUser) {
          if (err) {
            console.log(err);
          } else {
            credential.users.push(newUser);
            credential.save();
            res.send(credential);
          }
        });
      }
    })


    // console.log(req);
    // const username = req.body.username;
    //
    // const user = new User({
    //   username: username
    // });
    //
    // User.create(user, function(err, newUser) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     res.send(newUser);
    //   }
    // });
  });

  // SHOW a user
  app.get("/users/:id", function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
      if (err) {
        res.redirect("/users");
      } else {
        res.send(foundUser);
      }
    });
  });

  // EDIT a user
  app.get("/users/:id/edit", function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
      if (err) {
        res.redirect("/users");
      } else {
        res.send(foundUser);
      }
    });
  });

  // UPDATE a user
  app.put("/users/:id", function(req, res) {
    User.findByIdAndUpdate(
      req.params.id,
      req.body.username,
      { new: true },
      function(err, updatedUser) {
        if (err) {
          res.redirect("/users");
        } else {
          const username = req.body.username;
          updatedUser.username = username;
          updatedUser.save(function(err) {
            if (err) {
              console.log(err);
              res.redirect("/users");
            } else {
              res.send(updatedUser);
            }
          });
        }
      }
    );
  });

  // DELETE a user
  app.delete("/users/:id", function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, foundUser) {
      if (err) {
        res.redirect("/users");
      } else {
        res.send(foundUser);
      }
    });
  });
};
