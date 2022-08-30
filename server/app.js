const express = require("express");
const bodyPraser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
app.use(bodyPraser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: (args) => {
        return ["Romantic Cooking", "Sealing"];
      },
      createEvent: (args) => {
        console.log(args);
        const eventName = args.name;
        return eventName;
      },
    }, // this object have all resolvers functions (logic of the schema)
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Hello");
});
