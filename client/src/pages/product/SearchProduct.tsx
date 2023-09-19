import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchSearchProducts } from "../../redux/features/productSlice";
import ProductCardComponent from "../../components/productComponent/ProductCard";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material"; // Import Box and Typography from MUI

const SearchProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);

  // Use useParams to access the 'keyword' parameter from the URL
  const { keyword } = useParams();

  useEffect(() => {
    // Fetch products based on the 'keyword' from the URL
    if (keyword) {
      dispatch(fetchSearchProducts(keyword));
    }
  }, [dispatch, keyword]);

  return (
    <Box m={"4rem"}>
      <Typography variant="h3" color={"black"} fontSize={"2xl"}>
        Search Products
      </Typography>
      {/* Pass the fetched products to ProductCardComponent */}
      <ProductCardComponent products={products} />
    </Box>
  );
};

export default SearchProduct;
