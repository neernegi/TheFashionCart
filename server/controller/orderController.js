import catchAsyncError from "../middleware/catchAsyncError.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";

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

    // Collect all the cartIds from orderItems
    const cartIds = orderItems.map((item) => item.cartId);

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

    // Clear the carts associated with the collected cartIds
    for (const cartId of cartIds) {
      await Cart.deleteMany({ _id: cartId });
    }

    // Respond with a 201 (Created) status code and the created order
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    // Add error handling and response
    res.status(500).json({
      success: false,
      message: "Order placement failed",
    });
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
  const sellerProducts = await Product.find({ seller: req.params.sellerId });
  console.log(sellerProducts);

  // Extract an array of product IDs owned by the seller
  const sellerProductIds = sellerProducts.map((product) => product._id);
  console.log(sellerProductIds);

  // Find all orders where the seller's products have been ordered
  const orders = await Order.find({
    "orderItems.productId": { $in: sellerProductIds },
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// export const getSellerOrders = catchAsyncError(async (req, res) => {
//   // Find all products associated with the seller
//   const sellerProducts = await Product.find({ seller: req.user.id });

//   // Extract an array of product IDs owned by the seller
//   const sellerProductIds = sellerProducts.map((product) => product._id);

//   // Find all orders where the seller's products have been ordered by the user
//   const sellerOrders = await Order.find({
//     user: req.user.id,
//     "orderItems.productId": { $in: sellerProductIds },
//   });

//   res.status(200).json({
//     success: true,
//     sellerOrders,
//   });
// });

// update orders status - seller
export const updateOrderItemStatus = catchAsyncError(async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return next(new Error("Order not found with this Id", 404));
    }

    const orderItemId = req.params.orderItemId;
    const status = req.body.status;

    // Find the order item by its ID within the order's orderItems array
    const orderItemToUpdate = order.orderItems.find(
      (item) => item._id.toString() === orderItemId
    );

    if (!orderItemToUpdate) {
      return next(new Error("Order item not found in this order", 404));
    }

    if (orderItemToUpdate.orderStatus === "Delivered") {
      return next(new Error("You have already delivered this order item", 400));
    }

    // Update the order item's status
    orderItemToUpdate.orderStatus = status;

    // Check if the overall order status should be updated
    const allItemsDelivered = order.orderItems.every(
      (item) => item.orderStatus === "Delivered"
    );

    if (allItemsDelivered) {
      order.orderStatus = "Delivered";
      order.deliveredAt = Date.now();
    }

    // Update stock for each product in the order
    for (const orderItem of order.orderItems) {
      await updateStock(orderItem.productId, orderItem.quantity);
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});




async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found with the given ID: " + id); // Handle the case where the product is not found
  }
  product.Stock -= quantity; // Fixed property name
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
