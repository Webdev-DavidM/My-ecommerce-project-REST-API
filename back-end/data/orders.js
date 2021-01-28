import mongoose from 'mongoose';

const orders = [
  {
    //eventually I need to make sure the user below links
    // the user model
    user: new mongoose.Types.ObjectId('60102a258bb2611c90252ca4'),
    dateOfOrder: 12022021,
    // eventually this product below needs to link to the produc
    // directly on the bikes model
    orderItems: [
      {
        qty: 10,
        item: {
          _id: new mongoose.Types.ObjectId('6011cd61fda5b5218b217d79'),
        },
      },
      {
        item: {
          qty: 5,
          _id: new mongoose.Types.ObjectId('6011cd61fda5b5218b217d79'),
        },
      },
    ],

    total: 1999,
    status: 'delivered',
  },
  {
    //eventually I need to make sure the user below links
    // the user model
    user: new mongoose.Types.ObjectId('60102a258bb2611c90252ca4'),
    dateOfOrder: 12022021,
    // eventually this product below needs to link to the produc
    // directly on the bikes model
    orderItems: [
      {
        qty: 10,
        item: {
          _id: new mongoose.Types.ObjectId('6011cd61fda5b5218b217d79'),
        },
      },
      {
        qty: 5,
        item: {
          _id: new mongoose.Types.ObjectId('6011cd61fda5b5218b217d79'),
        },
      },
    ],

    total: 1999,
    status: 'delivered',
  },
];

export default orders;
