import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchSubcategoryFilterProducts,
  fetchProducts,
} from "../../redux/features/productSlice";
import ProductCardComponent from "../../components/productComponent/ProductCard";

const SubcategoryProduct:React.FC = () => {
  const dispatch = useAppDispatch();
  const subcategoryId = useAppSelector(
    (state) => state.category.selectedSubcategory
  );
  const products = useAppSelector((state) => state.product.products);

  // Fetch seller products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    // Fetch products when the selected subcategory changes
    if (subcategoryId) {
      dispatch(fetchSubcategoryFilterProducts(subcategoryId));
    }
  }, [dispatch, subcategoryId]);

  // Filter products by selected subcategory
  const categoryProducts = products.filter(
    (product) => product.subcategory === subcategoryId
  );
  return (
    <Box>
      <Typography variant="h3" component={"h3"} color={"black"}>
        category products
      </Typography>
      <Box>
        <ProductCardComponent products={categoryProducts} />
      </Box>
    </Box>
  );
};

export default SubcategoryProduct;
