const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION);
  } catch (error: unknown) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
