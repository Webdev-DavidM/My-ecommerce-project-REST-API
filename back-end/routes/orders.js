import express from 'express';
const app = express();
import mongoose from 'mongoose';

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
  res.json(orders);
});

app.post('/new-order', jwtVerify, async (req, res) => {
  let { userId, date, orderItems, total, status } = req.body.orderInfo;
  let idConverted = mongoose.Types.ObjectId(userId);
  console.log(orderItems);
  let orders = orderItems.map((item) => {
    delete item.images;
    delete item.qtyOfSizeInStock;
    delete item.name;
    item.item = item.id;
    item.qty = item.quantity;
    delete item.id;
    delete item.quantity;
    return item;
  });
  console.log(orders);

  let order = new Orders({
    user: idConverted,
    dateOfOrder: date,
    orderItems: orders,
    total: total,
    status: status,
  });

  try {
    let savedOrder = await order.save();
    if (savedOrder) {
      res.status(201).json(savedOrder);
    }
  } catch (err) {
    res.status(401).json(err.message);
    console.log(err);
  }
});

export default app;
