import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
      maxPoolSize: 50,     
      minPoolSize: 5,             
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      autoIndex: false            // important for production
    });

    console.log(
      `Mongodb connected successfully !! ${conectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MONGODB CONNECTION ERROR`, error);
    process.exit(1);
  }
};

export default connectDB;