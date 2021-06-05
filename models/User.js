const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  refreshExpiryDate: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
