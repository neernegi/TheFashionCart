import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Product, fetchProducts } from "../../redux/features/productSlice";
import {
  fetchCartProducts,
  removeCartProducts,
} from "../../redux/features/cartSlice";
import { useAuth } from "../context/useAuth";
import { Box, Button, Typography, Input } from "@mui/material";
import axios from "axios";

interface CartProductProps {
  cartProduct: Product;
}

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
}

const CartProducts: React.FC = () => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const userId = auth?.user?._id;
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<{ [productId: string]: number }>({});
  const [individualPrices, setIndividualPrices] = useState<{
    [productId: string]: number;
  }>({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartProducts(userId)).then(() => {
        setLoading(false);
      });
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const savedQuantities = localStorage.getItem("cartQuantities");
    if (savedQuantities) {
      setQuantity(JSON.parse(savedQuantities));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartQuantities", JSON.stringify(quantity));
  }, [quantity]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: newQuantity,
    }));
  };

  const handleIncrement = (item: CartItem) => {
    const currentQuantity = quantity[item.productId] || item.quantity;
    const cartProduct = products.find(
      (product) => product._id === item.productId
    );

    if (cartProduct) {
      const qty = currentQuantity + 1;
      if (qty <= (cartProduct.Stock || 0)) {
        updateQuantity(item.productId, qty);
        updateCartQuantity(item._id, qty);
      }
    }
  };

  const handleDecrement = (item: CartItem) => {
    const currentQuantity = quantity[item.productId] || item.quantity;
    if (currentQuantity <= 1) {
      return;
    }

    const cartProduct = products.find(
      (product) => product._id === item.productId
    );

    if (cartProduct) {
      const qty = currentQuantity - 1;
      updateQuantity(item.productId, qty);
      updateCartQuantity(item._id, qty);
    }
  };

  const updateCartQuantity = async (cartId: string, newQuantity: number) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/cart/update-cart-quantity/${cartId}`,
        { quantity: newQuantity }
      );

      console.log("Cart quantity updated:", response.data);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const handleRemove = (cartId: string) => {
    if (cartId) {
      dispatch(removeCartProducts(cartId)).then(() => {
        // After removing, re-fetch the cart products
        if (userId) {
          dispatch(fetchCartProducts(userId));
        }
      });
    }
  };

  // const [totalPrice, setTotalPrice] = useState<number>(0);

  // useEffect(() => {
  //   // Calculate the total price based on the quantity and product price
  //   const newTotalPrice = cartItems.reduce((total, item) => {
  //     const cartProduct = products.find(
  //       (product) => product?._id === item?.productId
  //     );

  //     if (cartProduct) {
  //       const currentQuantity = quantity[item?.productId] || item?.quantity;
  //       const productPrice = cartProduct.price;
  //       total += currentQuantity * productPrice;
  //     }

  //     return total;
  //   }, 0);

  //   setTotalPrice(newTotalPrice);
  // }, [cartItems, products, quantity]);

  useEffect(() => {
    // Calculate the individual prices based on the quantity and product price
    const newIndividualPrices: { [productId: string]: number } = {};

    cartItems.forEach((item) => {
      const cartProduct = products.find(
        (product) => product?._id === item?.productId
      );

      if (cartProduct) {
        const currentQuantity = quantity[item?.productId] || item?.quantity;
        const productPrice = cartProduct.price;
        newIndividualPrices[item.productId] = currentQuantity * productPrice;
      }
    });

    setIndividualPrices(newIndividualPrices);
  }, [cartItems, products, quantity]);

  return (
    <Box width={"100%"} margin={"5rem 5rem"}>
      <Typography variant="h2" fontSize={"2xl"} color={"black"}>
        Cart Products
      </Typography>
      {loading ? (
        <Typography variant="body1" fontSize={"1.5rem"} color={"black"}>
          Loading...
        </Typography>
      ) : (
        Array.isArray(cartItems) &&
        (cartItems.length === 0 ? (
          <Typography variant="body1" fontSize={"1.5rem"} color={"black"}>
            Your cart is empty.
          </Typography>
        ) : (
          cartItems.map((item) => {
            if (!item) {
              return null; // Handle the case when item is undefined
            }

            const cartProduct = products.find(
              (product) => product?._id === item?.productId
            ) as Product;
            const currentQuantity = quantity[item?.productId] || item?.quantity;

            return (
              <Box display={"flex"} key={item?._id}>
                <Box>
                  <Box display={"flex"} gap={"4rem"} m={"3rem"}>
                    <Box mb={"4rem"}>
                      <img
                        style={{ width: "10rem" }}
                        src={cartProduct?.images[0]?.url}
                        alt={cartProduct?.name}
                      />
                    </Box>

                    <Typography variant="h5" color={"black"}>
                      {cartProduct?.name}
                    </Typography>
                    <Typography variant="h5" color={"black"}>
                      Total Price:
                      {individualPrices[item.productId]?.toFixed(2) || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Box display={"flex"} ml={"2rem"} mt={"2rem"} gap={3}>
                    <Button
                      onClick={() => handleDecrement(item)}
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
                      value={currentQuantity}
                    />
                    <Button
                      onClick={() => handleIncrement(item)}
                      style={{ fontSize: "3rem" }}
                      variant="outlined"
                    >
                      +
                    </Button>
                  </Box>

                  <Button
                    variant="contained"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </Button>
                </Box>
                <Box>
                  <Typography variant="h3" fontSize={"2xl"} color={"black"}>
                    Price Details
                  </Typography>
                  <Typography variant="h3" fontSize={"2xl"} color={"black"}>
                    Price ({``} {' '} items)
                  </Typography>
                  <Typography variant="h3" fontSize={"2xl"} color={"black"}>
                    Price Details
                  </Typography>
                  
                </Box>
              </Box>
            );
          })
        ))
      )}
    </Box>
  );
};

export default CartProducts;
