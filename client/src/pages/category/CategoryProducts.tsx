import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchCategoryFilterProducts,
  fetchProducts,
} from "../../redux/features/productSlice";
import ProductCardComponent from "../../components/productComponent/ProductCard";

const CategoryProducts = () => {
  const dispatch = useAppDispatch();
  const categoryId = useAppSelector((state) => state.category.selectedCategory);
  const products = useAppSelector((state) => state.product.products);
  console.log(categoryId)

  //   const categories = useAppSelector((state) => state.category.categories);
  const CategoryProducts = products.find(
    (product) => product.category === categoryId
  );
  console.log(CategoryProducts);

  // Fetch seller products when the component mounts
 
  useEffect(() => {
    // Fetch products when the selected category changes
    if (categoryId) {
      dispatch(fetchCategoryFilterProducts(categoryId));
    }
  }, [dispatch, categoryId]);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log(products)

  const filteredProducts = products.filter(
    (product) => product.category === categoryId
  );

  return (
    <Box>
      <Typography mt={'4rem'} ml={'5rem'} variant="h3" component={"h3"} color={"black"}>
        Category products
      </Typography>
      <Box>
        <ProductCardComponent products={filteredProducts} />
      </Box>
    </Box>
  );
};

export default CategoryProducts;
