const Collection = require("../../../models/Collection");
const Link = require("../../../models/Link");
const uuidv4 = require("uuid").v4;

module.exports = {
  createLink: async (args, context) => {
    const { req } = context;
    /*Validate Authentication */
    if (!req.isAuth) {
      throw new Error("Unauthenticated. Please login.");
    }

    const { linkTitle, linkUrl, collectionId } = args.linkInput;
    console.log(collectionId);
    /*Validate if Collection Id is valid and belongs to user signed in */
    const collection = await Collection.findOne({
      collectionId: collectionId,
    });

    console.log(collection);

    if (!collection || collection.userId !== req.userId) {
      throw new Error(
        "No existing collection with the given collectionId or the collection does not belong to the signed in user."
      );
    }

    const newLink = new Link({
      linkTitle: linkTitle,
      linkUrl: linkUrl,
      collectionId: collectionId,
      linkId: uuidv4(),
    });

    const res = await newLink.save();
    return res;
  },

  getLinksByCollectionId: async (args, context) => {
    /*Validate Authentication */
    const { req } = context;
    if (!req.isAuth) {
      throw new Error("Unauthenticated. Please login.");
    }
    const { collectionId } = args;

    /*Validate if Collection Id is valid and belongs to user signed in */
    const collection = await Collection.findOne({
      collectionId: collectionId,
    });

    if (!collection || collection.userId !== req.userId) {
      throw new Error(
        "No existing collection with the given collectionId or the collection does not belong to the signed in user."
      );
    }

    const links = await Link.find({ collectionId: collectionId });
    links.forEach((link) => {
      delete link._id;
    });

    return links;
  },
  editLink: async (args, context) => {
    const { req } = context;
    const { linkId, linkTitle, linkUrl } = args;

    /*Validate authentication */
    if (!req.isAuth) {
      throw new Error("Unauthenticated. Please login.");
    }

    const link = await Link.findOne({ linkId: linkId });
    if (!link) {
      throw new Error("No existing user with the given userId.");
    }

    link.linkTitle = linkTitle;
    link.linkUrl = linkUrl;
    await link.save();

    delete link._id;
    return link;
  },
};
