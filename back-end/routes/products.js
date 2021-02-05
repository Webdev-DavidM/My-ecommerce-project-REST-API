import express from 'express';
const app = express();

// Here I am importing all the categories we need to send to the
// front end

import multer from 'multer';
export const upload = multer({ dest: 'uploads/' });

// with es6 modules i haver to use the full filename with .js otherwise it wont find it unlike in react with babel.
import Product from '../models/Products.js';

// GET request- return all the products, I will let redux choose which
// Products to display based on the category and subcategory properties

app.get('/:category', async (req, res) => {
  let { category } = req.params;
  console.log(category);

  try {
    let products = await Product.find({ category });
    if (products) {
      console.log(products);
      res.status(200).json(products).end();
    } else {
      res.status(401).json(`No ${category} found`).end();
    }
  } catch (err) {
    res.json(err);
  }
});

// Get one Product from the document

app.get('/product/:id', async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.status(200).json(product).end();
    } else {
      res.status(401).json('No product found').end();
    }
  } catch (err) {
    res.json(err);
  }
});

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
