const mongoose = require("mongoose");

let credentialSchema = new mongoose.Schema({
  username: String,
  password: String
});

let Credential = mongoose.model("Credential", credentialSchema);
module.exports = Credential;
