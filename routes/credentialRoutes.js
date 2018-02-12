const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const Credential = require("../models/credential");
const User = require("../models/user");
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
  });

  // DELETE a user
  app.delete("/api/credential/:id/users/:user_id", function(req, res) {
    User.findByIdAndRemove(req.params.user_id, function(err, foundUser) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(foundUser);
      }
    });

    Credential.findById(req.params.id, function(err, credential) {
      if (err) {
        console.log(err);
      } else {
        var index;
        for(var i = 0; i < credential.users.length; i++) {
          if(credential.users[i] == req.params.user_id) {
            index = i;
          }
        }
        credential.users.splice(index, 1)
        credential.save(function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log("credential saved!");
          }
        })
      }
    })
  });

  // CREDENTIAL SHOW "DASHBOARD"
  app.get("/api/credential/:id", function(req, res) {
    Credential.findById(req.params.id, function(err, foundCredential) {
      if (err) {
        res.redirect("/users");
      } else {
        async function retrieveOwnedUsers() {
          var foundUsers = [];
          for(let i = 0; i < foundCredential.users.length; i++) {
            var currentID = foundCredential.users[i];
            var addedUser = await User.findById(currentID, function(err, foundUser) {
              if(err) {
                console.log(err);
              } else {
                return foundUser;
              }
            });
            foundUsers.push(addedUser)
          }
          res.send(foundUsers);
        }
        retrieveOwnedUsers();
      }
    });
  });
};
