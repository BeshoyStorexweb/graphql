const express = require("express");
const bodyPraser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

const app = express();
app.use(bodyPraser.json());

app.use(
  "/graphql",
  graphqlHttp.graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.irteb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("conntected");
  })
  .catch((err) => console.log(err));
