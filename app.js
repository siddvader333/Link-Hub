const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const User = require("./models/User");
const graphqlSchema = require("./graphql/schema/graphqlSchema");
const graphqlResolvers = require("./graphql/resolvers/rootResolver");
const isAuth = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP((req, res) => {
    return {
      /*Configure Graphql API */

      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      graphiql: true,
      context: { req: req, res: res, test: "sup" },
    };
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
