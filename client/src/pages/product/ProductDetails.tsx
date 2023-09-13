import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSingleProductDetails } from "../../redux/features/productSlice"; // Import the Product type
// import ProductImageCarousel from "../../components/productComponent/ProductImageCarousel";
import { fetchSellerDetail } from "../../redux/features/sellerSlice";
import Carousel from "react-material-ui-carousel";
import { addToCartAsync, selectItems } from "../../redux/features/cartSlice";


const ProductDetails: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const dispatch = useAppDispatch();
  const product = useAppSelector(
    (state) => state.product.product // Assuming 'state.product.product' is the single product
  );
  const seller = useAppSelector((state) => state.seller.seller);
  const items = useAppSelector(selectItems);
  console.log(seller);


  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product._id === product?._id) < 0) {
      console.log({ items, product });
      const newItem = {
        product: product?._id,
        quantity: 1,
      };
      if (selectedColor) {
        newItem.product = selectedColor;
      }
      if (selectedSize) {
        newItem.product.Stock = selectedSize;
      }
      dispatch(addToCartAsync({, alert}));
    } else {
      alert.error('Item Already added');
    }
  };


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

  const increaseQuantity = () => {
    // Assuming quantity and product are state variables
    const newQuantity = quantity + 1;

    if (newQuantity <= product.Stock) {
      setQuantity(newQuantity);
    }
  };
  const decreaseQuantity = () => {
    const qty = quantity - 1;
    if (qty > 0) {
      setQuantity(qty);
    }
  };

  return (
    <Box ml={"50rem"} display={"flex"} mt={"10rem"} gap={"4rem"}>
      <Box border={"2px gray solid"} p={"2rem"}>
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
          <Box display={"flex"} ml={"2rem"} mt={"2rem"} gap={3}>
            <Button
              onClick={decreaseQuantity}
              style={{ fontSize: "3rem" }}
              variant="outlined"
            >
              -
            </Button>
            <input
              style={{
                backgroundColor: "gray",
                outline: "none",
                border: "none",
                fontSize: "3rem",
                width: "2.2rem",
              }}
              type="text"
              value={quantity}
            />
            <Button
              onClick={increaseQuantity}
              style={{ fontSize: "3rem" }}
              variant="outlined"
            >
              +
            </Button>
          </Box>
          <Box>
            <Button
              style={{ margin: "1rem", fontSize: "2rem" }}
              variant="contained"
              onClick={handleCart}
            >
              Add to Cart
            </Button>
            <Button style={{ fontSize: "2rem" }} variant="contained">
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
