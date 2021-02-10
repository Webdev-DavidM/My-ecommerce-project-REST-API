import mongoose from 'mongoose';
import connectDB from '../config/db.js';

// import indoors from './indoors.js';
// import Indoor from '../models/Indoors.js';
import products from './products.js';
import Products from '../models/Products.js';
import users from './users.js';
import User from '../models/User.js';
import orders from './orders.js';
import Order from '../models/Orders.js';
import bcrypt from 'bcrypt';

connectDB();

let hashedUsers;

const importData = async () => {
  try {
    await Products.deleteMany();
    const productList = products.map((product) => {
      return { ...product };
    });
    await Products.insertMany(productList);

    // await Order.deleteMany();
    // const ordersList = orders.map((order) => {
    //   console.log(order);
    //   return { ...order };
    // });
    // await Order.insertMany(ordersList);

    // as I need to hash the password on my admin users in my seeder file before I put them in the database,
    // I have had to map over each user and hash the password and I have used promise all so this works with

    // a map function

    const hashUserPassword = async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      return user;
    };

    hashedUsers = await Promise.all(
      users.map((user) => hashUserPassword(user))
    );
    console.log(hashedUsers);
    await User.insertMany(hashedUsers);
    console.log('Import successful!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

//   console.error(`${error}`);

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
