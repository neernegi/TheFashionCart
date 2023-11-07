import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Slider, Stack, Typography, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  Product,
  fetchCategoryFilterProducts,
  fetchProducts,
} from "../../../redux/features/productSlice";
import { ProductCardComponent } from "../../../components/productComponent/ProductCard";

const DropdownMenu = styled(Box)({
  position: "absolute",
  zIndex: 1,
  borderRadius: "1rem",
  backgroundColor: "#443f40a2",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
  padding: "10px",
  minWidth: "200px",
});

const SelectCategoryProduct: React.FC = () => {

 

  const dispatch = useAppDispatch();

  // Use useSelector to access the products from the Redux store
  const products = useAppSelector((state) => state.product.products);

  // Fetch seller products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  const categories = useAppSelector((state) => state.category.categories);
  const categoryId = useAppSelector((state) => state.category.selectedCategory);

  // Find the selected category by categoryId
  const selectedCategory = categories.find(
    (category) => category._id === categoryId
  );

  console.log(selectedCategory);
  console.log(products);

  // Create a set of unique brand names

 
 

  useEffect(() => {
    // Fetch products when the selected category changes
    if (categoryId) {
      dispatch(fetchCategoryFilterProducts(categoryId));
    }
  }, [dispatch, categoryId]);


  return (
    <Box mt={"10rem"}>
      <Stack justifyContent={"space-around"} direction={"row"}>
        <Typography
          variant="h2"
          component="h4"
          fontWeight={"bold"}
          color="black"
        >
          {selectedCategory ? selectedCategory.label : ""} Products
        </Typography>
        
      </Stack>
      <Box m={"4rem 6rem"} display={"flex"} gap={"22rem"}>
        <Stack mt={"1rem"}></Stack>
        <ProductCardComponent
          products={products}
        />
      </Box>
     
    </Box>
  );
};

export default SelectCategoryProduct;
