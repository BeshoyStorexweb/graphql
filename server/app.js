const express = require("express");
const bodyPraser = require("body-parser");
const graphqlHttp = require("express-graphql");

const app = express();
app.use(bodyPraser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: null,
    rootValue: {} // this object have all resolvers functions
  })
);

app.listen(3000, () => {
  console.log("Hello");
});
