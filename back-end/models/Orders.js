import mongoose from 'mongoose';

//please adjust the name of the model titles as required

const ordersSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "Please provide a value for 'ObjectId'"],
    },
    dateOfOrder: {
      type: Number,
      required: [true, "Please provide a value for 'date'"],
    },
    // There is a product array so each product can be put in as
    // an object with a quantity.
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cycle',
        required: [true, 'please provide a product i.d'],
      },
    ],
    total: {
      type: Number,
      required: [true, "Please provide a value for 'total'"],
    },
    status: {
      type: String,
      required: [true, "Please provide a value for 'status'"],
    },
  },
  { useUnifiedTopology: true }
);

const Order = mongoose.model('Orders', ordersSchema);

export default Order;
