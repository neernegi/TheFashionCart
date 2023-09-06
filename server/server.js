import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js";
// import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import cors from "cors";
// import multer from "multer";
// import { Server } from "socket.io";

// routes
import productRoutes from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";
import seller from "./routes/sellerRoute.js";
import admin from "./routes/adminRoute.js";
import chat from "./routes/chatRoute.js";
import message from "./routes/messageRoute.js";
import category from "./routes/categoryRoute.js";
import banner from "./routes/bannerRoute.js";

// configure env
dotenv.config();

// handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

// rest object
const app = express();
app.use(cors());

// connecting to database
connectDB();

// cloudinary.config({
//   cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//   api_key:process.env.CLOUDINARY_API_KEY,
//   api_secret:process.env.CLOUDINARY_API_SECRET,
// })

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload())

// routes
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/user", user);
app.use("/api/v1/order", order);
app.use("/api/v1/seller", seller);
app.use("/api/v1/admin", admin);
app.use("/api/v1/chat", chat);
app.use("/api/v1/message", message);
app.use("/api/v1/category", category);
app.use("/api/v1/banner", banner);

// middleware for error
app.use(errorMiddleware);

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server is working on localhost:${PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});

// const io = new Server(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:8080",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("connected to socket.io");

//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     console.log(userData._id)
//     socket.emit("connected");
//   });

//   socket.on('join chat',(room) =>{
//     socket.join(room);
//     console.log("User Joined Room: " + room)
//   });

//   socket.on('new message',(newMessageRecieved) => {
//     var chat = newMessageRecieved.chat;

//     if(!chat.users) return console.log("chat.users not defined")

//   })
// });
