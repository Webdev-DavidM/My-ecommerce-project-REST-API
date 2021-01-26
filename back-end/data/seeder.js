import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import cycles from './cycles.js';
import Cycle from '../models/Cycle.js';
// import indoors from './indoors.js';
// import Indoor from '../models/Indoors.js';
import users from './users.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

connectDB();

const importData = async () => {
  try {
    await Cycle.deleteMany();
    const cyclesList = cycles.map((cycle) => {
      return { ...cycle };
    });
    await Cycle.insertMany(cyclesList);

    let usersList = Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        return { ...user };
      })
    ).then;
    console.log(usersList);

    // await User.insertMany(usersList);

    // console.log('Data Imported!');
    // process.exit();
  } catch (error) {
    // return { ...user };

    console.error(`${error}`);
    process.exit(1);
  }
};

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
