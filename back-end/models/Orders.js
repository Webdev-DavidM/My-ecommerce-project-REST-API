import { ObjectId, ObjectID } from 'mongodb';
import mongoose from 'mongoose';

//please adjust the name of the model titles as required

const ordersSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectID,
      required: [true, "Please provide a value for 'ObjectId'"],
    },
    dateOfOrder: {
      type: ObjectID,
      required: [true, "Please provide a value for 'date'"],
    },
    product: {
      type: ObjectId,
      required: [true, "Please provide a value for 'product'"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide a value for 'number'"],
    },
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
