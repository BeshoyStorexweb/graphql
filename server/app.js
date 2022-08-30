const express = require('express');
const bodyPraser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Event = require('./models/event');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

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
          creator: '630e85c34c3ac05f30a5a95d',
        });
        let createdEvent;
        return event
          .save()
          .then((res) => {
            createdEvent = { ...res._doc };
            return User.findById('630e85c34c3ac05f30a5a95d');
          })
          .then((user) => {
            if (user) {
              throw new Error('User existing already.');
            }
            user.createdEvents.push(event);
            return user.save();
          })
          .then((res) => {
            return createdEvent;
          })
          .catch((err) => {
            throw err;
          });
      },
      createUser: async (args) => {
        const existingUser = await User.findOne({
          email: args.userInput.email,
        });
        if (existingUser) throw new Error('User exists already');

        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword,
        });
        const result = await user.save();
        return { ...result._doc };
      },
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
