const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const User = require("./models/User");
const graphqlSchema = require("./graphql/schema/graphqlSchema");
const graphqlResolvers = require("./graphql/resolvers/rootResolver");
const isAuth = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    /*Configure Graphql API */
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
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
