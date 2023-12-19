import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createSubCategory } from "../../../redux/features/subCategorySlice";
import { Category, fetchCategories } from "../../../redux/features/categorySlice";


const CreateSubCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [subCategoryNames, setSubCategoryNames] = useState<string>("");

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreateSubCategory = () => {
    if (subCategoryNames.trim() && selectedCategory) {
      dispatch(
        createSubCategory({
          categoryName: selectedCategory.label,
          subCategoryNames: subCategoryNames
            .split(",")
            .map((name) => name.trim()),
        })
      );

      setSelectedCategory(null);
      setSubCategoryNames("");
    }
  };

  return (
    <Box>
      <Autocomplete
        options={categories}
        value={selectedCategory}
        onChange={(event, newValue) => {
          setSelectedCategory(newValue);
        }}
        getOptionLabel={(option) => {
          console.log("Option:", option);
          return option.label;
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select a category" />
        )}
      />

      <TextField
        type="text"
        placeholder="Subcategory Names (comma-separated)"
        value={subCategoryNames}
        onChange={(e) => setSubCategoryNames(e.target.value)}
      />
      <Button variant="contained" onClick={handleCreateSubCategory}>
        Create Subcategories
      </Button>
    </Box>
  );
};

export default CreateSubCategory;
