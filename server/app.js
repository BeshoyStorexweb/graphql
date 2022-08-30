const express = require('express');
const bodyPraser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Event = require('./models/event');

const app = express();
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

        type User {
          _id: ID!
          email: String!
          password: String
        }

        input UserInput{
          email: String!
          password: String!
        }
        
        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: async (args) => {
        const events = await Event.find();
        return events.map((e) => ({ ...e._doc }));
      },
      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        });
        return event
          .save()
          .then((res) => {
            return { ...res._doc };
          })
          .catch((err) => {
            throw err;
          });
      },
      // createUser: args => {}
    }, // this object have all resolvers functions (logic of the schema)
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.irteb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log('conntected');
  })
  .catch((err) => console.log(err));
