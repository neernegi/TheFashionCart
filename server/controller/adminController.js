import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../models/userModel.js";
import Seller from "../models/sellerModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";



// get all user --- (admin)
export const getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find({ role: "user" });

  res.status(200).json({
    success: true,
    users,
  });
});


// get single user (admin)
export const getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id:${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});


/* 
            From now on seller data started
*/


// get all seller  (admin)
export const getAllSellerData = catchAsyncError(async (req, res, next) => {
  const sellers = await Seller.find();

  res.status(200).json({
    success: true,
    sellers,
  });
});


// get single seller (admin)
export const getSingleSeller = catchAsyncError(async (req, res, next) => {
  const seller = await Seller.findById(req.params.id);

  if (!seller) {
    return next(
      new ErrorHandler(`User does not exist with Id:${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    seller,
  });
});


// delete seller admin
export const deleteSellerProfile = catchAsyncError(async (req, res) => {
  const seller = await Seller.findById(req.params.id);

  if (!seller) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  await seller.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});


/*
         Seller's products -----  For QC Checking and for QC Update
*/
// Assuming you have required the necessary modules and defined the Product model

// Assuming you have required the necessary modules and defined the Product model

export const updateProductQCStatus = catchAsyncError(async (req, res) => {
  const productId = req.params.productId; // Assuming the productId is passed as a URL parameter

  // Check if productId exists
  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required for updating QC status",
    });
  }

  // Extract the updated `qcStatus` from the request body
  const { qcStatus } = req.body;

  // Check if the `qcStatus` field exists in the request body
  if (!qcStatus) {
    return res.status(400).json({
      success: false,
      message: "QC Status is required for updating",
    });
  }

  if (qcStatus === "Passed") {
    return res.status(400).json({
      success: false,
      message: "Already passed Qc Status",
    });
  }

  // Update the product's `qcStatus` field
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { qcStatus }, // Update the `qcStatus` field only
    { new: true } // Setting this option to get the updated document as the result
  );

  if (!updatedProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product QC status updated",
    product: updatedProduct,
  });
});

// Progress QC status

export const getProgressQcStatus = async (req, res) => {
  const progressProduct = await Product.find({ qcStatus: "Progress" });

  res.status(200).json({
    success: true,
    progressProduct,
  });
};

// Passed qcStatus

export const getPassedQcStatus = async (req, res) => {
  const progressProduct = await Product.find({ qcStatus: "Passed" });

  res.status(200).json({
    success: true,
    progressProduct,
  });
};

// Passed qcStatus

export const getFailedQcStatus = async (req, res) => {
  const progressProduct = await Product.find({ qcStatus: "Failed" });

  res.status(200).json({
    success: true,
    progressProduct,
  });
};
