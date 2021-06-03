const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const User = require("./models/User");
const Link = require("./models/Link");
const Collection = require("./models/Collection");

const app = express();

const links = [];
const collections = [];

app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    /*Configure Graphql API */
    schema: buildSchema(`

            type Link {
                _id: ID!
                linkTitle: String!
                linkUrl: String!
                linkId: String!
                collectionId: String!
            }

            input LinkInput {
                linkTitle: String!
                linkUrl: String!
                collectionId: String!
            }

            type Collection {
                _id: ID!
                collectionTitle: String!
                collectionId: String!
                userId: String!
            }

            input CollectionInput {
                collectionTitle: String!
                userId: String!
            }

            type RootQuery {
                links: [Link!]!
                collections: [Collection!]!
            }

            type RootMutation {
                createCollection(collectionInput: CollectionInput): Collection
                createLink(linkInput: LinkInput) : Link
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
    rootValue: {
      links: () => {
        return Link.find()
          .then((links) => {
            return links.map((link) => {
              return { ...link._doc };
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      collections: () => {
        return collections;
      },
      createCollection: (args) => {
        const newCollection = {
          _id: Math.random().toString(),
          collectionTitle: args.collectionTitle,
          userId: args.userId,
          collectionId: Math.random().toString(),
        };
        collections.push(newCollection);
      },
      createLink: (args) => {
        const link = new Link({
          linkTitle: args.linkInput.linkTitle,
          linkUrl: args.linkInput.linkUrl,
          collectionId: args.linkInput.collectionId,
          linkId: Math.random().toString(),
        });

        return link
          .save()
          .then((result) => {
            console.log(result);
            return { ...result._doc };
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
    },
    graphiql: true,
  })
);

/*MongoDB Connection */
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@link-hub.2fvmo.mongodb.net/link-hub?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
