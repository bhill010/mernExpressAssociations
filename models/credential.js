const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let credentialSchema = new mongoose.Schema({
  username: String,
  password: String
});

credentialSchema.plugin(passportLocalMongoose);

let Credential = mongoose.model("Credential", credentialSchema);
module.exports = Credential;
