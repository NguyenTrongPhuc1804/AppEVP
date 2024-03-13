const { default: mongoose } = require("mongoose");

require("dotenv").config();

const urlDb = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@evnetp.isjzxsd.mongodb.net/?retryWrites=true&w=majority&appName=EvnetP`;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(urlDb);
    console.log("connect database successfully");
  } catch (error) {}
};
module.exports = connectDB;
