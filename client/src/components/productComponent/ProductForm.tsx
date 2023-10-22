import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Autocomplete,
  Grid,
  Input,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Category, fetchCategories } from "../../redux/features/categorySlice";
import {
  SubCategory,
  fetchSubCategories,
} from "../../redux/features/subCategorySlice";
import { createProduct } from "../../redux/features/productSlice";
import { useAuth } from "../../pages/context/useAuth";

const CreateProductForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    SubCategory[]
  >([]);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>();
  const [description, setDescription] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [Stock, setStock] = useState<number | undefined>(); // Changed Stock to stock
  const [avatar, setAvatar] = useState<File | null>();
  const dispatch = useAppDispatch();
  const { auth } = useAuth();
  const categories = useAppSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (newValue: Category | null) => {
    setSelectedCategory(newValue);

    if (newValue) {
      const selectedCategorySubcategories = newValue?.subCategories || [];
      setFilteredSubcategories(selectedCategorySubcategories);
      setSelectedSubCategory(null);
    } else {
      setFilteredSubcategories([]);
    }
  };

  const handleCreateProduct = (e: FormEvent) => {
    const sellerId = auth?.user?._id;
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price || 0); // Send as integer
    formData.set("description", description);
    formData.set("brand", brand);
    formData.set("Stock", Stock || 0); // Send as integer
    if (selectedCategory) {
      formData.set("category", selectedCategory._id || "");
    }
    if (selectedSubCategory) {
      formData.set("subcategory", selectedSubCategory._id || "");
    }
    if (avatar) {
      formData.set("avatar", avatar);
    }

    dispatch(createProduct({ sellerId, formData }));
  };

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
        <form onSubmit={handleCreateProduct} style={{ marginTop: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Product Name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                autoComplete="price"
                value={price || 0}
                onChange={(e) =>
                  setPrice(parseFloat(e.target.value) || undefined)
                } // Parse the value to a float
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Description"
                name="description"
                type="description"
                id="description"
                autoComplete="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={categories}
                getOptionLabel={(option) => option?.label}
                renderInput={(params) => (
                  <TextField {...params} label="Select a category" />
                )}
                value={selectedCategory}
                onChange={(_, newValue) => {
                  handleCategoryChange(newValue);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={filteredSubcategories}
                getOptionLabel={(option) => option?.name}
                renderInput={(params) => (
                  <TextField {...params} label="Select a Sub-Category" />
                )}
                value={selectedSubCategory}
                onChange={(_, newValue) => setSelectedSubCategory(newValue)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Brand"
                id="brand"
                name="brand"
                multiline
                rows={4}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Stock"
                id="stock"
                name="stock"
                multiline
                rows={4}
                value={Stock}
                onChange={(e) =>
                  setStock(parseInt(e.target.value) || undefined)
                } // Parse the value to an integer
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="file"
                name="avatar"
                inputProps={{ accept: "image/*" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAvatar(e.target.files![0])
                }
                style={{ fontSize: "2rem" }}
              />
            </Grid>
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
