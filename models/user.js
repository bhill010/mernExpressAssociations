const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  username: String,
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }
});

let User = mongoose.model("User", userSchema);
module.exports = User;
