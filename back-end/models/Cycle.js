import mongoose from 'mongoose';

//please just the name of the model titles as required

const cycleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a value for 'name'"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a value for 'price'"],
    },
    description: {
      type: String,
      required: [true, "Please provide a value for 'description'"],
    },
    images: {
      type: Array,
      required: [true, "Please provide a value for 'images'"],
    },
    stock: {
      type: Number,
      required: [true, "Please provide a value for 'price '"],
    },
    size: {
      type: String,
      required: [true, "Please provide a value for 'size'"],
    },
    reviews: {
      type: Array,
      required: [true, 'Please provide a value for array even if empty'],
    },
    subcategory: {
      type: String,
      required: [true, "Please provide a value for 'subcategory'"],
    },
  },

  { useUnifiedTopology: true }
);

const Cycle = mongoose.model('Cycle', cycleSchema);

export default Cycle;
