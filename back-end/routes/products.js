import express from 'express';
const app = express();

// Here I am importing all the categories we need to send to the
// front end

import multer from 'multer';
export const upload = multer({ dest: 'uploads/' });

// with es6 modules i haver to use the full filename with .js otherwise it wont find it unlike in react with babel.
import Cycle from '../models/Cycle.js';
import Run from '../models/Run.js';
import Indoors from '../models/Indoors.js';
import Outdoors from '../models/Outdoors.js';
import Swim from '../models/Swim.js';
import Triathlon from '../models/Triathlon.js';

// GET request- return all the products, I will let redux choose which
// Products to display based on the category and subcategory properties

app.get('/:category', async (req, res) => {
  // Below i have used a switch statement to only return the products in a certain category
  let products;
  switch (req.params.category) {
    case 'cycle':
      try {
        products = await Cycle.find();
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
  if (products) {
    res.status(200).json(products).end();
  } else {
    res.status(401).json('no bike found').end();
  }
});

// Get one item from the document

// app.get('/bikes:id', async (req, res) => {
//   try {
//     let bike = await Bike.findOne({ _id: req.params._id });
//     if (bike) {
//       res.status(200).json(bikes).end();
//     } else {
//       res.status(401).json('no bike found').end();
//     }
//   } catch (err) {
//     res.json(err);
//   }
// });

// // Post a new item to the document

// app.post('/bikes:id', async (req, res) => {
//   try {
//     let bike = await Bike.findOne({ _id: req.params._id });
//     if (bike) {
//       res.status(200).json(bikes).end();
//     } else {
//       res.status(401).json('no bike found').end();
//     }
//   } catch (err) {
//     res.json(err);
//   }
// });

// // Update an item in the document

// app.post('/bikes', async (req, res) => {
//   let bike = {
//     model: req.body.model,
//     description: req.mody.description,
//     price: req.body.price,
//   };
//   try {
//     let newBike = await Bike.save(bike);
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json('error');
//   }
// });

// // Delete an item from the document

// app.delete('/bikes:id', async (req, res) => {
//   try {
//     let bikeToDelete = await Bike.findOne({ _id: req.params._id });
//     if (bikeToDelete) {
//       await Bike.deleteOne({ _id: req.params.id });
//       res.status(200).json(bikes).end();
//     } else {
//       res.status(401).json('no bike found').end();
//     }
//   } catch (err) {
//     res.json(400).json(err);
//   }
// });

export default app;
