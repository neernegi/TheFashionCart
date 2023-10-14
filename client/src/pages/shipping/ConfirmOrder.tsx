import React, { Fragment, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ShippingInfoProps } from "../shipping/Shipping";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCartProducts } from "../../redux/features/cartSlice";
import { Product, fetchProducts } from "../../redux/features/productSlice";
import { useAuth } from "../context/useAuth";
import PriceDetails from "../../components/PriceDetail";

const ConfirmOrder = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const { auth } = useAuth();
  const userId = auth?.user?._id;

  // orderInfo from session storage
  const orderInfo = sessionStorage.getItem("orderInfo");
  const orderInfoData = orderInfo ? JSON.parse(orderInfo) : null;
  console.log(orderInfoData);

  // console.log(orderInfo.delivery);

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

  // Load the selected address from local storage
  const savedSelectedAddress = sessionStorage.getItem("selectedShippingInfo");
  const addressData = savedSelectedAddress
    ? JSON.parse(savedSelectedAddress)
    : null;

  const selectedShippingInfo = () => {
    if (addressData) {
      return (
        <Box marginLeft={"20rem"} marginTop={"5rem"}>
          <Typography fontSize={"2rem"} color={"black"}>
            {addressData.address}
          </Typography>
          <Typography fontSize={"2rem"} color={"black"}>
            {addressData.city}
          </Typography>
          <Typography fontSize={"2rem"} color={"black"}>
            {addressData.country}
          </Typography>
          <Typography fontSize={"2rem"} color={"black"}>
            {addressData.pinCode}
          </Typography>
          <Typography fontSize={"2rem"} color={"black"}>
            {addressData.phoneNo}
          </Typography>
        </Box>
      );
    } else {
      return (
        <Typography fontSize={"2rem"} color={"black"}>
          No shipping address selected
        </Typography>
      );
    }
  };

  return (
    <Fragment>
      <Box>{selectedShippingInfo()}</Box>
      <Box>
        <Box width={"100%"} margin={"5rem 5rem"}>
          <Typography variant="h2" fontSize={"2xl"} color={"black"}>
            Cart Products
          </Typography>
          {loading ? (
            <Typography variant="body1" fontSize={"1.5rem"} color={"black"}>
              Loading...
            </Typography>
          ) : (
            <div>
              {cartItems.map((item) => {
                if (!item) {
                  return null; // Handle the case when item is undefined
                }

                const cartProduct = products.find(
                  (product) => product?._id === item?.productId
                ) as Product;

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
                          {cartProduct?.price}
                        </Typography>

                        <Typography
                          variant="body1"
                          fontSize={"1.5rem"}
                          color={"black"}
                        >
                          Quantity: {item?.quantity}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
              <Box>
                <PriceDetails
                  cartItems={cartItems}
                  totalProductsPrice={orderInfoData.totalProductsPrice}
                  discount={orderInfoData.discount}
                  delivery={orderInfoData.delivery}
                  totalPrice={orderInfoData.totalPrice}
                />
              </Box>
            </div>
          )}
        </Box>
      </Box>
    </Fragment>
  );
};

export default ConfirmOrder;
