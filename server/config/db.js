import mongoose from "mongoose";

const connectDB = async () => {
  const connectionDB = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex option is removed and included within the useNewUrlParser option
  });

  console.log(`Mongodb connected with server: ${connectionDB.connection.host}`);
};

export default connectDB;
