import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import Seller from "../models/sellerModel.js";
import User from "../models/userModel.js";
import sendToken from "../utils/token.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary.js";

// Register seller
export const registerSeller = catchAsyncError(async (req, res, next) => {
  const {
    name,
    email,
    password,
    shopName,
    description,
    state,
    country,
    address,
    street,
    nearBy,
    city,
    pincode,
  } = req.body;


  const { buffer } = req.file;

    // Upload avatar image to Cloudinary
    const myCloud = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            folder: "avatar",
            width: 150,
            crop: "scale",
          },
          (error, result) => {
            if (error) {
              console.error(error);
              return reject("Error uploading to Cloudinary");
            }
            resolve(result);
          }
        )
        .end(buffer);
    });

  // Check if the email already exists in the User model
  const userEmail = await User.findOne({ email });

  if (!userEmail) {
    // If the email is not already registered, create a new seller
    const seller = await Seller.create({
      name,
      email,
      password,
      shopName,
      description,
      state,
      country,
      pickupAddress: {
        address,
        street,
        nearBy,
      },
      city,
      pincode,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    sendToken(seller, 201, res);
  } else {
    // If the email is already registered, return an error
    return next(new ErrorHandler("Email must be different"));
  }
});

// login seller

export const loginSeller = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const seller = await Seller.findOne({ email }).select("+password");

  if (!seller) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await seller.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Passwords match, send the token
  sendToken(seller, 200, res);
});

// Get seller detail
export const getSellerDetails = catchAsyncError(async (req, res, next) => {
  const seller = await Seller.findById(req.user.id);

  res.status(200).json({
    success: true,
    seller,
  });
});

// update password

export const updateSellerPassword = catchAsyncError(async (req, res, next) => {
  const user = await Seller.findById(req.user.id).select("+password");

  const isPasswordMatched = user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect ", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password doesn't match"));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// update user profile
export const updateSellerProfile = catchAsyncError(async (req, res) => {
  const newSellerData = {
    name: req.body.name,
    email: req.body.email,
    shopName: req.body.shopName,
    description: req.body.description,
    state: req.body.state,
    country: req.body.country,
    pickupAddress: req.body.pickupAddress,
    city: req.body.city,
    pincode: req.body.pincode,
  };

  const seller = await Seller.findByIdAndUpdate(req.user.id, newSellerData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    seller,
  });
});

// forgot seller password

export const forgotSellerPassword = catchAsyncError(async (req, res, next) => {
  const seller = await Seller.findOne({ email: req.body.email });

  if (!seller) {
    return next(new ErrorHandler("User not found", 404));
  }

  // get reset password token
  const resetToken = seller.getResetPasswordToken();

  await seller.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/apiv1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it `;

  try {
    await sendEmail({
      email: seller.email,
      subject: "Ecommerce password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${seller.email} successfully`,
    });
  } catch (error) {
    // If there is an error, handle it here
    seller.resetPasswordToken = undefined;
    seller.resetPasswordExpire = undefined;

    await seller.save({ validateBeforeSave: false });

    // Return the error response
    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password
export const resetSellerPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const seller = await Seller.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!seller) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  seller.password = req.body.password;
  seller.resetPasswordToken = undefined;
  seller.resetPasswordExpire = undefined;

  await seller.save();

  sendToken(seller, 200, res);
});
