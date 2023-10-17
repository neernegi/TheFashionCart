import React, { Fragment, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ShippingInfoProps } from "../shipping/Shipping";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCartProducts } from "../../redux/features/cartSlice";
import { Product, fetchProducts } from "../../redux/features/productSlice";
import { useAuth } from "../context/useAuth";
import PriceDetails from "../../components/PriceDetail";
import { OrderItem } from "../../redux/features/orderSlice";

const ConfirmOrder = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

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
    <>
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
              {orderInfoData.orderDetails.map((item: OrderItem) => (
                <Box key={item.productId} display={"flex"} gap={"3rem"}>
                  <Box mb={"4rem"}>
                    <img
                      style={{ width: "10rem" }}
                      src={item?.image}
                      alt={item?.name}
                    />
                  </Box>
                  <Typography variant="h5" color="black">
                    {item?.name}
                  </Typography>
                  <Typography
                    style={{ textDecoration: "line-through" }}
                    variant="h5"
                    color="black"
                  >
                    {item?.price}
                  </Typography>
                  <Typography variant="h4" color="black">
                    {item?.priceAfterDiscount}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontSize={"1.5rem"}
                    color={"black"}
                  >
                    Quantity: {item?.quantity}
                  </Typography>
                </Box>
              ))}
              <Box>
                <PriceDetails
                  cartItems={cartItems}
                  totalProductsPrice={orderInfoData?.totalProductsPrice}
                  discount={orderInfoData?.discount}
                  delivery={orderInfoData?.delivery}
                  totalPrice={orderInfoData?.totalPrice}
                />
              </Box>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ConfirmOrder;
