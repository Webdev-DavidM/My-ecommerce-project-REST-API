import express from 'express';
const app = express();
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// with es6 modules i haver to use the full filename with .js otherwise it wont find it unlike in react with babel.
import User from '../models/User.js';
// import AdminUser from "../models/AdminUser.js";

import jwt from '../helpers/jwtCreate.js';

// app.get('/', async (req, res) => {
//   console.log('route hit');
//   try {
//     let users = await User.find({});
//     if (users) {
//       console.log(users);
//       res.status(200).json(users).end();
//     } else {
//       res.status(401).json('no bike found').end();
//     }
//   } catch (err) {
//     res.json(err);
//   }
// });

app.post('/register', async (req, res) => {
  // Firstly I will make sure the user doesnt exist on the database already
  let existingUser = await User.find({ email: req.body.email });
  console.log(existingUser);
  if (existingUser.length !== 0) {
    return res
      .status(401)
      .json('The email address is already on the system, please log in.');
  }

  //Below I will bcrypt the password
  let { firstName, password, address, email, lastName } = req.body;
  const saltRounds = 10;
  let bcryptPassword;

  let user = new User({
    password: req.body.password,
    firstName,
    lastName,
    address,
    email,
  });

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      bcryptPassword = user.password;
    });
  });

  let savedUser = await user.save();
  let token = jwt(savedUser);

  console.log(savedUser, token);
  res.status(201).json({ email: user.email, id: user._id, token: token });
});
// bcrypt.genSalt(saltRounds, async (err, salt) => {
//   try {
//     bcrypt.hash(passwordHashed, salt, async (err, hash) => {
//       await User.save({
//         email,

//       });
//     });

app.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log(user.password);
      // Here I am checking if the bcrypt password works
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
          res.status(202).json({ name: user.name });
        } else {
          res.status(401).json('unauthorised');
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/admin-login', async (req, res) => {
  try {
    console.log(req.body);
    let user = await AdminUser.findOne({ email: req.body.email });
    console.log(user);
    if (req.body.password === user.password) {
      res.status(202).json('authorised');
    } else {
      res.status(401).json('unauthorised');
    }
  } catch (err) {
    console.log(err);
  }
});

export default app;
