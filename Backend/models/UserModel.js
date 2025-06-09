const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
  Address: {
    type: String,
  },
  Mobile: {
    type: String,
  },
  Photo: {
    type: String,
  },
});

module.exports = mongoose.model("Users", userSchema);
