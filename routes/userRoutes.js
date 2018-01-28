module.exports = (app) => {

  // GET users
  app.get('/', function(req, res, next) {
    User.find({}, function(err, allUsers) {
      if(err) {
        console.log(err);
      } else {
        res.send(allUsers);
      }
    });
  });

  // CREATE new user
app.post('/', function(req, res, next) {
  const username = req.body.username;

  const user = new User({
    username: username
  });

  User.create(user, function(err, newUser) {
    if(err) {
      console.log(err);
    } else {
      res.send(newUser);
    }
  })
})

// SHOW a user
app.get("/:id", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      res.redirect("/");
    } else {
      res.send(foundUser)
    }
  })
})

// EDIT a user
app.get("/:id/edit", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      res.redirect("/");
    } else {
      res.send(foundUser);
    }
  })
})

// UPDATE a user
app.put("/:id", function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body.username, {new: true}, function(err, updatedUser) {
    if(err) {
      res.redirect("/");
    } else {
      const username = req.body.username;
      updatedUser.username = username;
      updatedUser.save(function(err) {
        if (err) {
          console.log(err);
          res.redirect("/")
        } else {
          res.send(updatedUser);
        }
      });
    }
  })
})

// DELETE a user
app.delete("/:id", function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, foundUser) {
    if(err) {
      res.redirect("/")
    } else {
      res.send(foundUser);
    }
  })
})








}
