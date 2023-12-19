import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js";

import bodyParser from "body-parser";
import cors from "cors";


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
import cart from "./routes/cartRouter.js";
import shipping from "./routes/shippingRoute.js";
import payment from "./routes/paymentRoute.js";

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



// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload())

// routes
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cart);
app.use("/api/v1/user", user);
app.use("/api/v1/order", order);
app.use("/api/v1/seller", seller);
app.use("/api/v1/admin", admin);
app.use("/api/v1/chat", chat);
app.use("/api/v1/message", message);
app.use("/api/v1/category", category);
app.use("/api/v1/banner", banner);
app.use("/api/v1/shipping", shipping);
app.use("/api/v1/payment", payment);

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
