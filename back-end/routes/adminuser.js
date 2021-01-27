import express, { json } from 'express';
const app = express();
import jwt from 'jsonwebtoken';
import jwtVerify from '../middleware/jwtVerify.js';
import expressValidator from 'express-validator';
const { body, validationResult } = expressValidator;

import User from '../models/User.js';
import Cycle from '../models/Cycle.js';

// Note all admin routes are protected routes so I have chosen to store in them in a separate route from the
// users, I have added middleware to check there is a valid JWT token before adding the user. I will also check that the
// user requesting to change the products has admin rights with the server before making changes. i have also added a
// middleware called productDetailsCorrect to make sure that all the data required has been provided

/* POST route- this will create a new product in the database, */
// Below I am checking which category it is for so I know which model to add the product to

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
      console.log(req.email);
      let adminUser = await User.findOne({ email: req.email });

      if (adminUser) {
        if (adminUser.admin === false) {
          res
            .status(401)
            .json('You dont have authority to make these changes')
            .end();
        } else if (adminUser.admin === true) {
          switch (req.body.category) {
            case 'cycle':
              try {
                let newProduct = new Cycle(req.body);
                let createdProduct = await newProduct.save();
                if (createdProduct) {
                  return res.status(201).json(createdProduct);
                }
              } catch (err) {
                res.json(err);
              }
              break;
            case 'run':
              try {
                products = await Run.find();
              } catch (err) {
                res.json(err);
              }
              break;
            case 'cycle':
              try {
                products = await Cycle.find();
              } catch (err) {
                res.json(err);
              }
              break;
            case 'swim':
              try {
                products = await Swim.find();
              } catch (err) {
                res.json(err);
              }
              break;
            case 'outdoors':
              try {
                products = await Outdoor.find();
              } catch (err) {
                res.json(err);
              }
              break;
            case 'triathlon':
              try {
                products = await Triathlon.find();
              } catch (err) {
                res.json(err);
              }
              break;
            default:
              res.status(401).json('No matching category').end();
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
);

/* PUT route- this will update an existing product in the database, */
// Below I am checking which category it is for so I know which model to update

app.put(
  '/update/:productId',
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
    const { productId } = req.params;
    const { email } = req;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let adminUser = await User.findOne({ email });

      if (adminUser) {
        if (adminUser.admin === false) {
          res
            .status(401)
            .json('You dont have authority to make these changes')
            .end();
        } else if (adminUser.admin === true) {
          switch (req.body.category) {
            case 'cycle':
              console.log(req.params.productId);
              try {
                let updatedProduct = await Cycle.findByIdAndUpdate(
                  { _id: productId },
                  req.body
                );
                if (updatedProduct) {
                  return res.status(201).json(updatedProduct);
                }
              } catch (err) {
                res.json(err);
              }
              break;
            case 'run':
              try {
                products = await Run.find();
              } catch (err) {
                res.json(err);
              }
              break;
            case 'cycle':
              try {
                products = await Cycle.find();
              } catch (err) {
                res.json(err);
              }
              break;
            case 'swim':
              try {
                products = await Swim.find();
              } catch (err) {
                res.json(err);
              }
              break;
            case 'outdoors':
              try {
                products = await Outdoor.find();
              } catch (err) {
                res.json(err);
              }
              break;
            case 'triathlon':
              try {
                products = await Triathlon.find();
              } catch (err) {
                res.json(err);
              }
              break;
            default:
              res.status(401).json('No matching category').end();
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
);

/* PUT route- this will update an existing product in the database, */
// Below I am checking which category it is for so I know which model to update

app.delete('/delete/:productId', jwtVerify, async (req, res) => {
  const { productId } = req.params;
  const { email } = req;
  try {
    let adminUser = await User.findOne({ email });

    if (adminUser) {
      if (adminUser.admin === false) {
        res
          .status(401)
          .json('You dont have authority to make these changes')
          .end();
      } else if (adminUser.admin === true) {
        switch (req.headers.category) {
          case 'cycle':
            console.log(req.params.productId);
            try {
              let updatedProduct = await Cycle.findByIdAndDelete(
                { _id: productId },
                req.body
              );
              if (updatedProduct) {
                return res.status(204).json('Product deleted');
              }
            } catch (err) {
              res.json(err);
            }
            break;
          case 'run':
            try {
              products = await Run.find();
            } catch (err) {
              res.json(err);
            }
            break;
          case 'cycle':
            try {
              products = await Cycle.find();
            } catch (err) {
              res.json(err);
            }
            break;
          case 'swim':
            try {
              products = await Swim.find();
            } catch (err) {
              res.json(err);
            }
            break;
          case 'outdoors':
            try {
              products = await Outdoor.find();
            } catch (err) {
              res.json(err);
            }
            break;
          case 'triathlon':
            try {
              products = await Triathlon.find();
            } catch (err) {
              res.json(err);
            }
            break;
          default:
            res.status(401).json('No matching category').end();
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

export default app;
