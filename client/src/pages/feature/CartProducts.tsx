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
import { Link, useNavigate } from "react-router-dom";
import PriceDetails from "../../components/PriceDetail";
import {
  Order,
  OrderItem,
  fetchAllOrders,
} from "../../redux/features/orderSlice";

interface CartProductProps {
  cartProduct: Product;
}

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
}

const CartProducts: React.FC = () => {
  const [discount, setDiscount] = useState<number>(100);
  const [delivery, setDelivery] = useState<number>(200);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.product.products);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const order = useAppSelector((state) => state.order.orders);
  const seller = useAppSelector((state) => state.seller.seller);

  console.log(seller);

  const userId = auth?.user?._id;
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<{ [productId: string]: number }>({});
  const [individualPrices, setIndividualPrices] = useState<{
    [productId: string]: number;
  }>({});
  const [individualPricesAfterDiscount, setIndividualPricesAfterDiscount] =
    useState<{
      [productId: string]: number;
    }>({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => {
    if (userId) {
      dispatch(fetchAllOrders(userId));
    }
  }, [dispatch, userId]);

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
      updateQuantity(item.productId, qty);
      updateCartQuantity(item._id, qty);

      // Update the cart items in local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const updatedItemIndex = cartItems.findIndex(
        (ci: CartItem) => ci.productId === item?.productId
      );

      if (updatedItemIndex !== -1) {
        // Update the existing item in the cart items array
        cartItems[updatedItemIndex].quantity = qty;
      } else {
        // Add the new item to the cart items array
        const newItem = { productId: item.productId, quantity: qty };
        cartItems.push(newItem);
      }

      // Update the cart items in local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
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

      // Update the cart items in local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const updatedItemIndex = cartItems.findIndex(
        (ci: CartItem) => ci.productId === item.productId
      );

      if (updatedItemIndex !== -1) {
        // Update the existing item in the cart items array
        cartItems[updatedItemIndex].quantity = qty;
      }

      // Update the cart items in local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
      // Remove the cart item from Redux state
      dispatch(removeCartProducts(cartId)).then(() => {
        // After removing, re-fetch the cart products
        if (userId) {
          dispatch(fetchCartProducts(userId));
        }

        // Update local storage by removing the item with the given cartId
        const updatedCartItems = cartItems.filter(
          (item) => item._id !== cartId
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

        // Remove the "cartQuantities" entry from local storage
        localStorage.removeItem("cartItems");
      });
    }
  };

  const [totalProductsPrice, setTotalProductsPrice] = useState<number>(0);

  useEffect(() => {
    // Calculate the total price based on the quantity and product price
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      const newTotalPrice = cartItems.reduce((total, item) => {
        const cartProduct = products.find(
          (product) => product?._id === item?.productId
        );

        if (cartProduct) {
          const currentQuantity = quantity[item?.productId] || item?.quantity;
          const productPrice = cartProduct.price;
          total += currentQuantity * productPrice;
        }

        return total;
      }, 0);

      setTotalProductsPrice(newTotalPrice || 0);
    } else {
      setTotalProductsPrice(0); // Set total price to 0 when cart is empty or not an array
    }
  }, [cartItems, products, quantity]);

  useEffect(() => {
    // Calculate the individual prices based on the quantity and product price
    if (Array.isArray(cartItems)) {
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
    }
  }, [cartItems, products, quantity]);

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const newIndividualPriceAfterDiscount: { [productId: string]: number } =
        {};

      cartItems.forEach((item) => {
        const cartProduct = products.find(
          (product) => product?._id === item?.productId
        );

        if (cartProduct) {
          const currentQuantity = quantity[item?.productId] || item?.quantity;
          const productPrice = cartProduct.price - discount;
          newIndividualPriceAfterDiscount[item.productId] =
            currentQuantity * productPrice;
        }
      });

      setIndividualPricesAfterDiscount(newIndividualPriceAfterDiscount);
    }
  }, [cartItems, products, discount, quantity]);

  useEffect(() => {
    // Call totalPriceHandler whenever cartItems, individualPrices, delivery, or discount changes
    const totalPriceHandler = () => {
      // Calculate the total price based on individual product prices
      const productPrices = Object.values(individualPrices);
      const productTotalPrice = productPrices.reduce(
        (total, price) => total + price,
        0
      );

      // Calculate the total price including delivery charges and discounts
      const price = productTotalPrice + delivery - discount;
      setTotalPrice(price);
    };
    totalPriceHandler();
  }, [cartItems, individualPrices, delivery, discount]);

  const placeOrderHandler = () => {
    if (cartItems.length > 0) {
      const orderDetails = cartItems.map((item) => {
        const cartProduct = products.find(
          (product) => product._id === item?.productId
        ) as Product;
        const currentQuantity = quantity[item.productId] || item.quantity;
        const cartId = item?._id;
        const productPriceAfterDiscount =
          individualPricesAfterDiscount[item.productId] || 0;
        const productPrice = individualPrices[item.productId] || 0;

        return {
          productId: item.productId,
          name: cartProduct?.name,
          image: cartProduct?.avatar[0]?.url,
          priceAfterDiscount: productPriceAfterDiscount,
          price: productPrice,
          quantity: currentQuantity,
          cartId: cartId,
          brand: cartProduct?.brand,
        };
      });

      const data = {
        delivery,
        discount,
        totalProductsPrice,
        totalPrice,
        orderDetails,
      };

      sessionStorage.setItem("orderInfo", JSON.stringify(data));
      navigate("/shipping-confirm-order");
    } else {
      // Handle the case when the cart is empty
      // You might want to show a message or take a specific action here
    }
  };

  // if (auth?.user == null) {
  //   return (
  //     <Box m={"3rem"}>
  //       <Typography variant="h2" fontSize={"2xl"} color={"black"}>
  //         Cart Products
  //       </Typography>
  //       <Button
  //         style={{
  //           width: "17rem",
  //           height: "4rem",
  //           fontSize: "1.3rem",
  //           fontWeight: 600,
  //         }}
  //         variant="contained"
  //       >
  //         Please Login first
  //       </Button>
  //     </Box>
  //   );
  // }

  return (
    <Box width={"100%"} mt={"8rem"} mb={"23%"}>
      {cartItems.length > 0 && (
        <Typography
          textAlign={"center"}
          variant="h2"
          fontSize={"2xl"}
          color={"black"}
        >
          Cart Products
        </Typography>
      )}

      <Box mt={"6rem"} display={"flex"} justifyContent={"space-evenly"}>
        <Box>
          {auth?.user == null ? (
            <>
              <Link to={"/"}>
                <Button
                  style={{
                    marginLeft: "1.4rem",
                    width: "17rem",
                    height: "4rem",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                  }}
                  variant="contained"
                >
                  Please Login first
                </Button>
              </Link>
            </>
          ) : (
            <>
              {loading ? (
                <Typography variant="body1" fontSize={"1.5rem"} color={"black"}>
                  Loading...
                </Typography>
              ) : (
                Array.isArray(cartItems) &&
                (cartItems.length === 0 ? (
                  <Typography
                    // variant="body1"
                    fontSize={"3rem"}
                    textAlign={"center"}
                    mt={"10rem"}
                    color={"black"}
                    ml={"23.2vmax"}
                    mb={"2rem"}
                  >
                    Your cart is empty.
                  </Typography>
                ) : (
                  cartItems.map((item) => {
                    if (!item) {
                      return null; // Handle the case when item is undefined
                    }

                    const cartProduct = products.find(
                      (product) => product._id === item.productId
                    ) as Product;
                    const currentQuantity =
                      quantity[item.productId] || item.quantity;

                    return (
                      <React.Fragment key={item._id}>
                        <Box
                          boxShadow={"0px 0px 10px 2px rgba(0,0,0,0.2)"}
                          display={"flex"}
                          flexDirection={"column"}
                          gap={"0.7rem"}
                          mb={"5rem"}
                          p={"2rem"}
                          key={item._id}
                        >
                          <Box width={"20vmax"}>
                            <Box display={"flex"}  gap={"5rem"}>
                              <Box>
                                <img
                                  style={{ width: "13.2rem" }}
                                  src={cartProduct?.avatar[0]?.url}
                                  alt={cartProduct?.name}
                                />
                              </Box>
                              <Box mt={"2rem"}>
                                <Typography variant="h3" mb={2} color={"black"}>
                                  {cartProduct?.name}
                                </Typography>

                                <Typography variant="h4" mb={2} color={"black"}>
                                  {cartProduct?.brand}
                                </Typography>
                                <Typography
                                  variant="h3"
                                  color={"black"}
                                ></Typography>
                                <Box display={"flex"} gap={"2rem"}>
                                  <Typography variant="h3" color="black">
                                    {" "}
                                    ₹
                                    <span
                                      style={{
                                        textDecoration: "line-through",
                                        fontSize: "2.4rem",
                                      }}
                                    >
                                      {individualPrices[item.productId] || 0}
                                    </span>
                                  </Typography>
                                  <Typography
                                    variant="h3"
                                    fontWeight={700}
                                    color={"black"}
                                  >
                                    ₹
                                    {individualPricesAfterDiscount[
                                      item.productId
                                    ] || 0}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            display={"flex"}
                            gap={"2rem"}
                            alignItems={"center"}
                          >
                            <Box
                              display={"flex"}
                              // ml={"2rem"}
                              // mt={"2rem"}
                              gap={3}
                            >
                              <Button
                                onClick={() => handleDecrement(item)}
                                style={{ fontSize: "3rem" }}
                                variant="outlined"
                              >
                                -
                              </Button>

                              <Input
                                style={{
                                  boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
                                  // outline: " 1rem 1rem 1rem black",

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
                            fullWidth
                              sx={{
                                // width: "10rem",
                                height: "4rem",
                                fontSize: "1.8rem",
                              }}
                              variant="contained"
                              onClick={() => handleRemove(item?._id)}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      </React.Fragment>
                    );
                  })
                ))
              )}
            </>
          )}
        </Box>
        <Box>
          {cartItems.length > 0 && (
            <Box>
              <PriceDetails
                cartItems={cartItems}
                totalProductsPrice={totalProductsPrice}
                discount={discount}
                delivery={delivery}
                totalPrice={totalPrice}
              />
            </Box>
          )}
          {auth?.user !== null && cartItems.length > 0 && (
            <Button
              fullWidth
              size="large"
              onClick={placeOrderHandler}
              variant="contained"
              style={{ marginTop: "3rem", fontSize: "2.3rem" }}
            >
              Place Order
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CartProducts;
