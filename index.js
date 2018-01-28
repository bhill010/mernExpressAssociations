const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const User = require("./models/user");

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/userRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
