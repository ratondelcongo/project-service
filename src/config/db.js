import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/sistemas_distribuidos_s08");
  console.log("MongoDb Connected");
};

export default connectDB;
