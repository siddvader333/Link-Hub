const Collection = require("../../../models/Collection");
const uuidv4 = require("uuid").v4;
const User = require("../../../models/User");

module.exports = {
  createCollection: async (args, req) => {
    /*Validate Authentication */
    if (!req.isAuth) {
      throw new Error("Unauthenticated. Please login.");
    }

    const { collectionTitle } = args;

    /*Validate if User Id is valid */
    const users = await User.find({ userId: req.userId });

    if (users.length === 0) {
      throw new Error("No existing user with the given userId.");
    }

    const newCollection = new Collection({
      collectionTitle: collectionTitle,
      userId: req.userId,
      collectionId: uuidv4(),
    });

    const res = await newCollection.save();
    return res;
  },

  getCollectionsByUserId: async (args, req) => {
    /*Validate Authentication */
    if (!req.isAuth) {
      throw new Error("Unauthenticated. Please login.");
    }

    /*Get Collections only for current user */
    const collections = await Collection.find({ userId: req.userId });
    console.log(collections);
    collections.forEach((collection) => {
      delete collection._id;
    });

    return collections;
  },
};
