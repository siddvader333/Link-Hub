const linkResolvers = require("./Link/linkResolvers");
const collectionResolvers = require("./Collection/collectionResolvers");
const userResolvers = require("./User/userResolvers");

const rootResolver = {
  ...linkResolvers,
  ...collectionResolvers,
  ...userResolvers,
};

module.exports = rootResolver;
