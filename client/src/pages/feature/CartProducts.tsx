import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Product, fetchProducts } from "../../redux/features/productSlice";
import { fetchCartProducts, removeCartProducts } from "../../redux/features/cartSlice";
import { useAuth } from "../context/useAuth";
import { Box, Button, Typography, Input } from "@mui/material";
import CartComponentCard from "../../components/cart/CartComponentCard";

const CartProducts = () => {
  const { auth, setAuth } = useAuth();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const userId = auth?.user?._id;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartProducts(userId));
    }
  }, [dispatch, userId]);

  const removeCartProductHandler = (cartId: string) => {
    if (cartId) {
      dispatch(removeCartProducts(cartId));
    }
  };

  const [quantity, setQuantity] = useState<{ [productId: string]: number }>({});

  // Load saved quantities from localStorage when the component mounts
  useEffect(() => {
    const savedQuantities = localStorage.getItem("cartQuantities");
    if (savedQuantities) {
      setQuantity(JSON.parse(savedQuantities));
    }
  }, []);

  // Save quantities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartQuantities", JSON.stringify(quantity));
  }, [quantity]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: newQuantity,
    }));
  };

  return (
    <Box width={"100%"} margin={"5rem 5rem"}>
      <Typography variant="h2" fontSize={"2xl"} color={"black"}>
        Cart Products
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1" fontSize={"1.5rem"} color={"black"}>
          Your cart is empty.
        </Typography>
      ) : (
        cartItems.map((item) => {
          const cartProduct = products.find(
            (product) => product._id === item.productId
          );
          const currentQuantity = quantity[item.productId] || item.quantity;

          return (
            <Box key={item?._id} display={"flex"}>
              <Box>
                <CartComponentCard cartProduct={cartProduct} />
              </Box>
              <Box>
                <Box display={"flex"} ml={"2rem"} mt={"2rem"} gap={3}>
                  <Button
                    onClick={() => {
                      const qty = quantity[item.productId] - 1;
                      if (qty >= 1) {
                        updateQuantity(item.productId, qty);
                      }
                    }}
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
                      fontSize: "2.4rem",
                      width: "3rem",
                    }}
                    type="text"
                    value={quantity[item.productId] || item.quantity}
                  />
                  <Button
                    onClick={() => {
                      const qty =
                        (quantity[item.productId] || item.quantity) + 1;
                      if (qty <= (cartProduct?.Stock || 0)) {
                        updateQuantity(item.productId, qty);
                      }
                    }}
                    style={{ fontSize: "3rem" }}
                    variant="outlined"
                  >
                    +
                  </Button>
                </Box>

                <Button
                  variant="contained"
                  onClick={() => removeCartProductHandler(item?._id)}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default CartProducts;
