const express = require('express');
const bodyPraser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();
const events = [];
app.use(bodyPraser.json());

app.use(
  '/graphql',
  graphqlHttp.graphqlHTTP({
    schema: buildSchema(`
        type Event {
          _id: ID!
          title: String
          description: String!
          price: Float!
          date: String!
        }

        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }
        
        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: (args) => {
        return events;
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date().toISOString(),
        };
        events.push(event);
        return event;
      },
    }, // this object have all resolvers functions (logic of the schema)
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.irteb.mongodb.net/events?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log('conntected');
  })
  .catch((err) => console.log(err));
