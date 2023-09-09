import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSingleProductDetails } from "../../redux/features/productSlice"; // Import the Product type
// import ProductImageCarousel from "../../components/productComponent/ProductImageCarousel";
import { fetchSellerDetail } from "../../redux/features/sellerSlice";
import Carousel from "react-material-ui-carousel";

const ProductDetails: React.FC = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const dispatch = useAppDispatch();
  const product = useAppSelector(
    (state) => state.product.product // Assuming 'state.product.product' is the single product
  );
  const seller = useAppSelector((state) => state.seller.seller);
  console.log(seller);

  useEffect(() => {
    if (product?.seller) {
      // Assuming 'product.seller' contains the seller's ID
      dispatch(fetchSellerDetail(product?.seller));
    }
  }, [dispatch, product?.seller]);

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
    <Box justifyContent={"center"} display={"flex"}>
      <Box>
        <Carousel sx={{ width: "50rem" }}>
          {product.images &&
            product.images.map((image, i) => (
              <img
                style={{ width: "100%", height: "40rem" }}
                className="CarouselImage"
                key={image._id}
                src={image.url}
                alt={`${i} Slide`}
              />
            ))}
        </Carousel>
      </Box>
      <Box>
        <Typography color={"black"} variant="h4">
          {product.name}
        </Typography>
        <Typography color={"black"} variant="h4">
          {product.price}
        </Typography>
        <Typography color={"black"} variant="body1">
          {product.description}
        </Typography>
        <Typography color={"black"} variant="body1">
          Brand <span>{product.brand}</span>
        </Typography>
        <Typography color={"black"} variant="body1">
          {product.description}
        </Typography>
        <Typography color={"black"} variant="h4">
          {seller?.shopName}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetails;
