import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  TextField,
  Input,
  Snackbar,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSingleProductDetails } from "../../redux/features/productSlice";
import { fetchSellerDetail } from "../../redux/features/sellerSlice";
import Carousel from "react-material-ui-carousel";
import {
  addToCartAsync,
  fetchCartProducts,
} from "../../redux/features/cartSlice";
import { useAuth } from "../context/useAuth";
import ReviewCardComponent from "../../components/review/ReviewCardComponent";

const ProductDetails: React.FC = () => {
  const { auth, setAuth } = useAuth();
  const [quantity, setQuantity] = useState<number>(1);
  const [delivery, setDelivery] = useState<number>(200);
  const [individualPrices, setIndividualPrices] = useState<{
    [productId: string]: number;
  }>({});
  const [individualPricesAfterDiscount, setIndividualPricesAfterDiscount] =
    useState<{
      [productId: string]: number;
    }>({});
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);
  const seller = useAppSelector((state) => state.seller.seller);
  const cartProduct = useAppSelector((state) => state.cart.cartItems);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const userId = auth?.user?._id;

  const handleCart = async (e: any) => {
    e.preventDefault();

    if (!product) {
      return;
    }

    const { _id: productId, Stock } = product;

    if (productId && quantity > 0 && quantity <= Stock) {
      // Check if the product is already in the cart
      const isProductInCart = checkIfProductInCart(productId);

      if (isProductInCart) {
        alert("Product is already in the cart");
        return;
      }

      try {
        await dispatch(addToCartAsync({ quantity, productId, userId }));
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

        // Add the new item to the cart items array
        const newItem = { productId, quantity };
        cartItems.push(newItem);

        // Update the cart items in local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        setErrorMessage(null);
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error adding item to cart:", error);
        setErrorMessage("Failed to add item to cart. Please try again.");
      }
    } else {
      setErrorMessage("Invalid quantity. Please enter a valid quantity.");
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartProducts(userId));
    }
  }, []);

  const checkIfProductInCart = (productId: string) => {
    return (
      Array.isArray(cartProduct) &&
      cartProduct.find((item) => item.productId === productId)
    );
  };

  useEffect(() => {
    if (product?.seller) {
      dispatch(fetchSellerDetail(product?.seller));
    }
  }, [dispatch, product?.seller]);

  useEffect(() => {
    if (id) {
      dispatch(getSingleProductDetails(id));
    }
  }, [dispatch, id]);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    if (newQuantity <= (product?.Stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const decreaseQuantity = () => {
    const qty = quantity - 1;
    if (qty > 0) {
      setQuantity(qty);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // const placeOrderHandler = () => {
  //   if (cartItems.length > 0) {
  //     const orderDetails = cartItems.map((item) => {
  //       const cartProduct = products.find(
  //         (product) => product._id === item.productId
  //       ) as Product;
  //       const currentQuantity = quantity[item.productId] || item.quantity;
  //       const cartId = item?._id;
  //       const productPriceAfterDiscount =
  //         individualPricesAfterDiscount[item.productId] || 0;
  //       const productPrice = individualPrices[item.productId] || 0;

  //       return {
  //         productId: item.productId,
  //         name: cartProduct?.name,
  //         image: cartProduct?.images[0]?.url,
  //         priceAfterDiscount: productPriceAfterDiscount,
  //         price: productPrice,
  //         quantity: currentQuantity,
  //         cartId: cartId,
  //       };
  //     });

  //     const data = {
  //       delivery,
  //       discount,
  //       totalProductsPrice,
  //       totalPrice,
  //       orderDetails,
  //     };

  //     sessionStorage.setItem("orderInfo", JSON.stringify(data));
  //     navigate("/shipping-confirm-order");
  //   } else {
  //     // Handle the case when the cart is empty
  //     // You might want to show a message or take a specific action here
  //   }
  // };

  return (
    <>
      <Box ml={"50rem"} display={"flex"} mt={"10rem"} gap={"4rem"}>
        <Box border={"2px gray solid"} p={"2rem"}>
          <Carousel sx={{ width: "50rem" }}>
            {product?.avatar &&
              product.avatar.map((image, i) => (
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
              {product?.name}
            </Typography>
            <Typography color={"black"} variant="h4">
              {product?.price}
            </Typography>
            <Typography color={"black"} variant="body1">
              {product?.description}
            </Typography>
            <Typography color={"black"} variant="body1">
              Brand <span>{product?.brand}</span>
            </Typography>
            <Typography color={"black"} variant="body1">
              {product?.description}
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

              <Input
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
            </Box>
            {errorMessage && (
              <Typography color="error" variant="body1">
                {errorMessage}
              </Typography>
            )}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              message="Item added to cart"
            />
          </Box>
        </Box>
      </Box>
      {product?.reviews && product.reviews[0] ? (
        <Box>
          {product.reviews &&
            product.reviews.map((review) => (
              <Box
                key={review._id}
                ml={"4rem"}
                mt={"10rem"}
                display={"flex"}
                alignSelf={"center"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ReviewCardComponent review={review} />
              </Box>
            ))}
        </Box>
      ) : (
        <Typography fontSize={"2rem"} color={"black"}>
          No reviews yet
        </Typography>
      )}
    </>
  );
};

export default ProductDetails;
