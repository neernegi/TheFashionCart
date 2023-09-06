import mongoose from "mongoose"; // Don't forget to import Cloudinary
import Category from "../models/categoryModel.js";
import cloudinary from "../utils/cloudinary.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({ error: "Incomplete data provided" });
    }

    const { buffer } = req.file; // Get the image buffer

    const result = await cloudinary.v2.uploader
      .upload_stream(
        {
          folder: "category",
          width: 150,
          crop: "scale",
        },
        async (error, result) => {
          if (error) {
            console.error(error);
            return res
              .status(500)
              .json({ error: "Error uploading to Cloudinary" });
          }

          const categoryInfo = {
            name,
            avatar: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          };

          const existingCategory = await Category.findOne({ name });

          if (existingCategory) {
            return res
              .status(400)
              .json({ error: "Category name already exists" });
          }

          const category = new Category(categoryInfo);
          await category.save();

          res.status(201).json({
            success: true,
            category,
          });
        }
      )
      .end(buffer); // Pass the image buffer as a stream
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating category" });
  }
};

export const createSubCategory = async (req, res) => {
  try {
    const { categoryName, subCategoryNames } = req.body;

    // Input validation
    if (!categoryName || !subCategoryNames) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const existingSubCategoryNames = category.subCategories.map(
      (subCat) => subCat.name
    );

    const newSubCategories = subCategoryNames
      .filter(
        (subCategoryName) => !existingSubCategoryNames.includes(subCategoryName)
      )
      .map((subCategoryName) => ({ name: subCategoryName }));

    if (newSubCategories.length === 0) {
      return res
        .status(400)
        .json({ error: "All sub-categories already exist" });
    }

    category.subCategories.push(...newSubCategories);
    await category.save();

    res.status(201).json({
      success: true,
      newSubCategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating sub-categories" });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
};

export const getSubCategory = async (req, res) => {
  try {
    const selectedCategoryName = req.query.categoryName; // Assuming you're sending the categoryName in the request body
    const selectedCategory = await Category.findOne({ name: selectedCategoryName });

    if (!selectedCategory) {
      return res.status(404).json({ error: "Selected category not found" });
    }

    const subcategories = selectedCategory.subCategories; // Assuming subcategories is a field in your Category model

    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching subcategories" });
  }
};

// update categories

export const updateCategory = async (req, res) => {
  try {
    const { name, avatar, subCategories } = req.body;

    // Find the existing category by name
    const existingCategory = await Category.findOne({ name });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Update the category information
    existingCategory.avatar = avatar; // Update the avatar
    existingCategory.subCategories = subCategories; // Update subcategories

    await existingCategory.save();

    res.status(200).json({
      success: true,
      category: existingCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating category" });
  }
};
