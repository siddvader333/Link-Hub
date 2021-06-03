const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const linkSchema = new Schema({
  linkTitle: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
  linkId: {
    type: String,
    required: true,
  },
  collectionId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Link", linkSchema);
