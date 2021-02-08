import express from 'express';
const app = express();
import mongoose from 'mongoose';

import jwtVerify from '../middleware/jwtVerify.js';

import Orders from '../models/Orders.js';
import User from '../models/User.js';

app.get('/:userId', jwtVerify, async (req, res) => {
  const { userId } = req.params;
  try {
    let orders = await Orders.find({ user: userId });
    console.log(orders);
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(401).json('No orders found');
    }
  } catch (err) {
    res.status(401).json(err);
  }
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
