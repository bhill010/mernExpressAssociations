const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let credentialSchema = new mongoose.Schema({
  username: String,
  password: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

credentialSchema.plugin(passportLocalMongoose);

let Credential = mongoose.model("Credential", credentialSchema);
module.exports = Credential;
