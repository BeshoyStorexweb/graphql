const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");

const bcrypt = require("bcryptjs");

const transformEvent = (event) => {
  return {
    ...e._doc,
    creator: user.bind(this, e.creator),
    date: new Date(event._doc.date).toISOString(00),
  };
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (error) {
    throw error;
  }
};

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((e) => {
      return transformEvent(e);
    });
  } catch (error) {
    throw error;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return { ...event._doc, creator: user.bind(this, event.creator) };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async (args) => {
    const events = await Event.find();
    return events.map((e) => ({
      ...e._doc,
      date: new Date(e.date).toISOString(),
      creator: user.bind(this, e._doc.creator),
    }));
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((b) => {
        return {
          ...b._doc,
          user: user.bind(this, b.user),
          event: singleEvent.bind(this, b.event),
          createdAt: new Date(b._doc.createdAt).toISOString(),
          updatedAt: new Date(b._doc.updatedAt).toISOString(),
        };
      });
    } catch (error) {}
  },
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "630e85c34c3ac05f30a5a95d",
    });

    try {
      const result = await event.save();
      const creator = await User.findById("630e85c34c3ac05f30a5a95d");
      if (!creator) {
        throw new Error("User not found!.");
      }
      creator.createdEvents.push(event);
      await creator.save();
      return {
        ...result._doc,
        date: new Date(result.date).toISOString(),
        creator: user.bind(this, result._doc.creator),
      };
    } catch (error) {
      throw error;
    }
  },
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({
        email: args.userInput.email,
      });
      if (existingUser) throw new Error("User exists already");

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();
      return { ...result._doc };
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args) => {
    try {
    } catch (error) {
      throw error;
    }
  },

  cancelBooking: async (args) => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = {
        ...booking.event._doc,
        creator: user.bind(this, booking.event._doc.creator),
      };
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (error) {
      throw error;
    }
  },
}; // this object have all resolvers functions (logic of the schema)
