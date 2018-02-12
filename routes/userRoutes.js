const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Credential = require("../models/credential");

module.exports = app => {
  // GET users
  app.get("/api/users", function(req, res, next) {
    User.find({}, function(err, allUsers) {
      if (err) {
        console.log(err);
      } else {
        res.send(allUsers);
      }
    });
  });

  // CREATE new user
  app.post("/api/credential/:id/users", function(req, res, next) {
    Credential.findById(req.params.id, function(err, credential) {
      if (err) {
        console.log(err);
      } else {
        const username = req.body.username;
        const owner = {
          id: req.body.ownerID
        };

        const user = new User({
          username: username,
          owner: owner
        });

        User.create(user, function(err, newUser) {
          if (err) {
            console.log(err);
          } else {
            credential.users.push(newUser);
            credential.save();
            res.send(newUser);
          }
        });
      }
    });
  });

  // SHOW a user
  app.get("/api/users/:id", function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
      if (err) {
        console.log(err);
        res.redirect("/users");
      } else {
        res.send(foundUser);
      }
    });
  });

  // EDIT a user
  app.get("/api/credential/:id/users/:id/edit", function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
      if (err) {
        res.redirect("/users");
      } else {
        res.send(foundUser);
      }
    });
  });

  // UPDATE a user
  app.put("/api/credential/:id/users/:user_id", function(req, res) {
    User.findByIdAndUpdate(
      req.params.user_id,
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
  app.delete("/api/credential/:id/users/:user_id", function(req, res) {
    User.findByIdAndRemove(req.params.user_id, function(err, foundUser) {
      if (err) {
        res.redirect("/users");
      } else {
        res.send(foundUser);
      }
    });

    Credential.findById(req.params.id, function(err, credential) {
      if (err) {
        console.log(err);
      } else {
        var index;
        for (var i = 0; i < credential.users.length; i++) {
          if (credential.users[i] == req.params.user_id) {
            index = i;
          }
        }
        credential.users.splice(index, 1);
        credential.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("credential saved!");
          }
        });
      }
    });
  });
};
