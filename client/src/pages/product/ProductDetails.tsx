import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getSingleProductDetails,
  Product,
} from "../../redux/features/productSlice"; // Import the Product type
import ProductImageCarousel from "../../components/productComponent/ProductImageCarousel";

const ProductDetails: React.FC = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const dispatch = useAppDispatch();
  const product = useAppSelector(
    (state) => state.product.product // Assuming 'state.product.product' is the single product
  );

  console.log(product);
  useEffect(() => {
    if (id) {
      dispatch(getSingleProductDetails(id));
    }
  }, [dispatch, id]);

  if (!product) {
    // You might want to add a loading indicator here while fetching data
    return <div>Loading...</div>;
  }

  return (
    <Box justifyContent={"center"} display={'flex'}>
      <Box>
        <ProductImageCarousel images={product?.images} />
      </Box>
      <Box>
        <Typography color={"black"} variant="h4">
          {product.name}
        </Typography>
        <Typography color={"black"} variant="body1">
          {product.description}
        </Typography>
      </Box>

      {/* Display other product details as needed */}
    </Box>
  );
};

export default ProductDetails;
