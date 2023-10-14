import catchAsyncError from "../middleware/catchAsyncError.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";

// // create new order
// Import necessary dependencies, including the Order model

// Define the createNewOrder route handler
export const createNewOrder = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Extract data from the request body
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // Create a new order using Mongoose
    const order = await Order.create({
      user: userId,
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
    });

    // Respond with a 201 (Created) status code and the created order
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
   console.log(error)
  }
});

// get single order
export const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.userId).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user orders
export const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.params.userId });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders - seller
export const getSellerOrders = catchAsyncError(async (req, res) => {
  // Find all products associated with the seller
  const sellerProducts = await Product.find({ seller: req.user.id });

  // Extract an array of product IDs owned by the seller
  const sellerProductIds = sellerProducts.map((product) => product._id);

  // Find all orders where the seller's products have been ordered
  const sellerOrders = await Order.find({
    "orderItems.product": { $in: sellerProductIds },
  });

  res.status(200).json({
    success: true,
    sellerOrders,
  });
});

// update orders status - seller
export const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have delivered this order", 400));
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.Product, order.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.delivered = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// delete Order --admin

export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
