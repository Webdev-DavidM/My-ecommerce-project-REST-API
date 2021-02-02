import express from 'express';
const app = express();

import jwtVerify from '../middleware/jwtVerify.js';

import Orders from '../models/Orders.js';
import User from '../models/User.js';

app.get('/:userId', jwtVerify, async (req, res) => {
  const { userId } = req.params;
  let orders = await Orders.find({ user: userId }).populate('user');

  let DBproduct = await Cycle.findById(orders[0].orderItems[0].item);
  console.log(DBproduct);

  const findUserInDatabase = async (id) => {
    console.log(id);
    let DBitem = await Cycle.findById(id);
    return DBitem;
  };

  let productDetails = await Promise.all(
    orders.map((order) => {
      for (let i = 0; i < order.orderItems.length; i++) {
        findUserInDatabase(order.orderItems[i].item);
      }
    })
  );

  console.log(productDetails);

  res.json(orders);
});

export default app;
