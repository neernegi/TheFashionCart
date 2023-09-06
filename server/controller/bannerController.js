import Banner from "../models/bannerModel.js";
import cloudinary from "../utils/cloudinary.js";

export const createBanner = async (req, res, next) => {
  try {
    const { buffer } = req.file;

    // Check if a banner with the same image exists
    const existingBanner = await Banner.findOne({
      "image.public_id": req.file.filename,
    });

    if (existingBanner) {
      return res
        .status(400)
        .json({ message: "Image with the same name already exists" });
    }

    // Proceed with uploading and creating the banner
    cloudinary.v2.uploader
      .upload_stream(
        {
          folder: "banner",

          crop: "scale",
        },
        async (error, result) => {
          if (error) {
            console.error(error);
            return res
              .status(500)
              .json({ error: "Error uploading to Cloudinary" });
          }

          const bannerInfo = {
            image: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          };

          try {
            const newBanner = new Banner(bannerInfo);
            await newBanner.save();

            res.status(201).json({
              success: true,
              banner: newBanner,
            });
          } catch (error) {
            console.error(error);
            res
              .status(500)
              .json({ error: "Error saving banner to the database" });
          }
        }
      )
      .end(buffer); // Send a successful response with the saved banner
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const getAllBanner = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({
      success: true,
      banners: banners, // Rename the property to "banners"
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteBanner = async (req, res) => {
  const { publicId } = req.params; // Assuming the publicId is in the request parameters

  try {
    const deletedBanner = await Banner.findOneAndDelete({
      "image.public_id": publicId,
    });

    if (!deletedBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
      deletedBanner: deletedBanner,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
