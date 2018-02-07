const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Credential = require("../models/credential");

module.exports = app => {
  // GET users
  app.get("/api/users", function(req, res, next) {
    console.log("/users req.user", req.user);
    User.find({}, function(err, allUsers) {
      if (err) {
        console.log(err);
      } else {
        res.send(allUsers);
        console.log("/users data", allUsers);
      }
    });
  });

  // CREATE new user
  app.post("/api/credential/:id/users", function(req, res, next) {
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
            console.log("credential.users", credential.users);
            credential.users.push(newUser);
            credential.save();
            res.send(newUser);
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
  app.get("/api/users/:id", function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
      if (err) {
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
        for(var i = 0; i < credential.users.length; i++) {
          // console.log("credential users length", credential.users.length);
          // console.log("credential users i", credential.users[i]);
          // console.log("req.params.user_id", req.params.user_id);
          if(credential.users[i] == req.params.user_id) {
            index = i;
          }
        }
        // console.log("found index", index);
        // console.log("foundIndex :", foundIndex);
        // let index = credential.users.findIndex(req.params.user_id);
        // console.log("length before splice:", credential.users.length);
        credential.users.splice(index, 1)
        // console.log("length after splice:", credential.users.length);
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
};
