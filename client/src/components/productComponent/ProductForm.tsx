import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Autocomplete,
  Grid,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Category, fetchCategories } from "../../redux/features/categorySlice";
import { SubCategory } from "../../redux/features/subCategorySlice";

const CreateProductForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Filter subcategories based on selected category

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "20rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "5rem",
        }}
      >
        <form style={{ marginTop: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Product Name"
                autoComplete="title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Price"
                autoComplete="price"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Description"
                type="description"
                id="description"
                autoComplete="description"
              />
            </Grid>
            <Grid item xs={12}>
            <Autocomplete
                options={categories}
                getOptionLabel={(option) => option.value} // Display category name
                renderInput={(params) => (
                  <TextField {...params} label="Select a category" />
                )}
                value={selectedCategory}
                onChange={(_, newValue) => {
                  setSelectedCategory(newValue);
                  setSelectedSubCategory(null); // Clear selected subcategory
                }}
              />
            </Grid>
            <Grid item xs={12}>
            {/* <Autocomplete
                options={subcategor}
                getOptionLabel={(option) => option.name} // Display subcategory name
                renderInput={(params) => (
                  <TextField {...params} label="Select a Sub-Category" />
                )}
                value={selectedSubCategory}
                onChange={(_, newValue) => setSelectedSubCategory(newValue)}
              /> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Brand"
                id="brand"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Stock"
                id="stock"
                multiline
                rows={4}
              />
            </Grid>
            -
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Product
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProductForm;
