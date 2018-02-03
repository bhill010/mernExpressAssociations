const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const keys = require('./config/keys');
const passport = require("passport");
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose");

const User = require("./models/user");
const Credential = require("./models/credential");

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());

app.use(require("express-session")({
  secret: "Cats and dogs",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(Credential.authenticate()));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  Credential.findById(id, function(err, user) {
    done(err, user);
  });
});
// passport.serializeUser(Credential.serializeUser());
// passport.deserializeUser(Credential.deserializeUser());

require('./routes/userRoutes')(app);
require('./routes/credentialRoutes')(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

/**/
