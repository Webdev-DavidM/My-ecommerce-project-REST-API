import express from 'express';
const app = express();

import jwtVerify from '../middleware/jwtVerify.js';
import Orders from '../models/Orders.js';

app.get('/:userId', jwtVerify, async (req, res) => {
  const { userId } = req.params;
  let orders = await Orders.find({ user: userId })
    .populate('orderItems')
    .populate('user');

  res.json(orders);
});

export default app;
