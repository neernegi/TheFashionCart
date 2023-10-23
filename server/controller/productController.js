import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import cloudinary from "../utils/cloudinary.js";

// Create Product
export const createProduct = catchAsyncError(async (req, res) => {
  const { name, price, description, brand, Stock, category, subcategory } =
    req.body;
  console.log("Request Body: ", req.body);
  const seller = req.params.sellerId; // Assuming "sellerId" is the parameter name in the URL

  let images = [];
  if (Array.isArray(req.files)) {
    // Multiple files uploaded
    images = req.files.map((file) => file.buffer);
  } else if (req.file) {
    // Single file uploaded
    images = [req.file.buffer];
  }

  try {
    // Upload images to Cloudinary
    const uploadedImages = [];

    for (let i = 0; i < images.length; i++) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream(
            {
              folder: "product", // You can customize this folder
            },
            (error, result) => {
              if (error) {
                console.error(error);
                reject("Error uploading to Cloudinary");
              } else {
                resolve(result);
              }
            }
          )
          .end(images[i]);
      });

      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    // Create product in the database
    const product = await Product.create({
      name,
      price,
      description,
      brand,
      Stock,
      category,
      subcategory,
      seller,
      avatar: uploadedImages, // Associate all uploaded images with the product
    });

    res.status(201).json({
      success: true,
      message: "Product created and images uploaded to Cloudinary",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating product",
    });
  }
});

// Get single seller product
export const getSellerProducts = catchAsyncError(async (req, res) => {
  const apiFeature = new ApiFeatures(
    Product.find({ seller: req.params.sellerId }),
    req.query
  )
    .search()
    .filter();

  const products = await apiFeature.query;
  res.status(200).json({ success: true, products });
});

// get  progress qcStatus
export const getProgressProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  // Assuming your Seller schema has an 'id' field and req.user.id represents the seller's ID
  const apiFeature = new ApiFeatures(
    Product.find({ seller: req.user.id, qcStatus: "Progress" }),
    req.query
  )
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;
  res.status(200).json({ success: true, products });
});

// get passed qcStatus

export const getPassedProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  // Assuming your Seller schema has an 'id' field and req.user.id represents the seller's ID
  const apiFeature = new ApiFeatures(
    Product.find({ seller: req.user.id, qcStatus: "Passed" }),
    req.query
  )
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;
  res.status(200).json({ success: true, products });
});

// get failed qcStatus
export const getFailedProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  // Assuming your Seller schema has an 'id' field and req.user.id represents the seller's ID
  const apiFeature = new ApiFeatures(
    Product.find({ seller: req.user.id, qcStatus: "Failed" }),
    req.query
  )
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;
  res.status(200).json({ success: true, products });
});

// Get All Products
export const getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({ success: true, products });
});

// Get category filter Products
export const getCategoryFilterProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 10;
  const category = req.params.categoryId; // Change `categoryId` to match your route parameter name

  if (!category) {
    return res.status(400).json({ error: "Category parameter is required." });
  }

  try {
    // Use the `find` method to query products based on the category
    const filteredProducts = await Product.find({
      category,
    }).limit(resultPerPage);

    res.status(200).json({ success: true, products: filteredProducts });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
});
export const getSubcatetegoryFilterProducts = catchAsyncError(
  async (req, res) => {
    const resultPerPage = 10;
    const subcategory = req.params.subcategoryId; // Change `categoryId` to match your route parameter name

    if (!subcategory) {
      return res
        .status(400)
        .json({ error: "SubCategory parameter is required." });
    }

    try {
      // Use the `find` method to query products based on the category
      const filteredProducts = await Product.find({
        subcategory,
      }).limit(resultPerPage);

      res.status(200).json({ success: true, products: filteredProducts });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get Single Product Detail
export const getSingleProductDetail = catchAsyncError(
  async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  }
);


// update qc
export const updateProductQc = async (req, res) => {
  try {
    const productId = req.params.productId;
    const qcStatus = req.body.qcStatus;

    console.log('Received productId:', productId);
    console.log('Received qcStatus:', qcStatus);

    // Find the product by ID
    let productStatus;

    if (qcStatus === "Progress" || qcStatus === "Passed" || qcStatus === "Cancel") {
      productStatus = await Product.findByIdAndUpdate(productId, { qcStatus }, { new: true });
      if (!productStatus) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      return res.status(200).json({
        success: true,
        product: productStatus,
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid QC status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Update products

export const updateProducts = catchAsyncError(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      sucess: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  res.status(200).json({
    sucess: true,
    product,
  });
});

// Delete Product
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product delete successfully",
  });
});

// Create New Review or Update the review
export const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const isReviewed = product.reviews.find(
      (rev) => rev.user && rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      // Update the existing review
      product.reviews.forEach((rev) => {
        if (rev.user && rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      // Add a new review
      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get all review
export const getProductReviews = async (req, res, next) => {
  const product = await productModel.findById(req.query.id);
  if (!product) {
    return res.status(404).send({
      message: "Product not found",
    });
  }
  res.status(200).send({
    success: true,
    reviews: product.reviews,
  });
};

// delete review
export const deleteReview = async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);
  if (!product) {
    return res.status(404).send({
      message: "Product not found",
    });
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;
  await product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).send({
    success: true,
  });

  await product.save({ validateBeforeSave: false });

  res.status(200).send({
    success: true,
  });
};
