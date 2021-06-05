const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  collectionTitle: {
    type: String,
    required: true,
  },
  collectionId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Collection", collectionSchema);
