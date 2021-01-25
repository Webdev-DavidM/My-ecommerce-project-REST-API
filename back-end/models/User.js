import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide a value for 'email'"],
    },
    password: {
      type: String,
      required: [true, "Please provide a value for 'password'"],
    },
    address: {
      type: String,
      /* This only needed beofre checkout so isnt required when signing up */
    },
    reviews: [],
    /* a user is not required to make reviews so again not required */
  },
  { useUnifiedTopology: true }
);

const User = mongoose.model('User', usersSchema);

export default User;
