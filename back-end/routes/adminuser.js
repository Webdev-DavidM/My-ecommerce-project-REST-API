import express from 'express';
const app = express();
import jwt from 'jsonwebtoken';
import jwtVerify from '../middleware/jwtVerify.js';
import expressValidator from 'express-validator';
const { body, validationResult } = expressValidator;

import User from '../models/User.js';

// Note all admin routes are protected routes so I have chosen to store in them in a separate route from the
// users, I have added middleware to check there is a valid JWT token before adding the user. I will also check that the
// user requesting to change the products has admin rights with the server before making changes. i have also added a
// middleware called productDetailsCorrect to make sure that all the data required has been provided

/* POST route- this will create a new product in the database, */

app.post(
  '/create',
  jwtVerify,
  body('name', 'Name is required').not().isEmpty(),
  body('price').isInt().not().isEmpty(),
  body('description', 'Description is required').not().isEmpty(),
  body('images', 'Image path is required').not().isEmpty(),
  body('stock').isInt().not().isEmpty(),
  body('size', 'Size is required').not().isEmpty(),
  body('reviews').isArray(),
  body('subcategory', 'Subcategory is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { userId } = req.payload;
      console.log(req.body);
      let adminUser = await User.findById(userId);
      if (adminUser) {
        if (!adminUser.admin) {
          res
            .status(401)
            .json('You dont have authority to make these changes')
            .end();
        }
        console.log();
      }
    } catch (err) {}
  }
);

export default app;
