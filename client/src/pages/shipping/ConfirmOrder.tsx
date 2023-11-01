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
        <Box marginLeft={"5rem"}>
          <Typography fontSize={"2.3rem"} color={"black"}>
            {addressData.address}
          </Typography>
          <Typography fontSize={"2.3rem"} color={"black"}>
            {addressData.city}
          </Typography>
          <Typography fontSize={"2.3rem"} color={"black"}>
            {addressData.pinCode}
          </Typography>
          <Typography fontSize={"2.3rem"} color={"black"}>
            {addressData.country}
          </Typography>
          <Typography fontSize={"2.3rem"} color={"black"}>
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
      <Box>
        <Box>
          <Box
            display={"flex"}
            // gap={"20rem"}
            marginTop={"8rem"}
            justifyContent={"space-evenly"}
          >
            <Box>
              <Box>{selectedShippingInfo()}</Box>
              <Box width={"100%"} margin={"5rem 5rem"}>
                <Typography
                  variant="h2"
                  fontSize={"2xl"}
                  mb={"3rem"}
                  color={"black"}
                >
                  Cart Products
                </Typography>
                {loading ? (
                  <Typography
                    variant="body1"
                    fontSize={"2.3rem"}
                    color={"black"}
                  >
                    Loading...
                  </Typography>
                ) : (
                  <Box>
                    {orderInfoData.orderDetails.map((item: OrderItem) => (
                      <Box
                        p={"1rem"}
                        boxShadow={"0px 0px 10px 2px rgba(0,0,0,0.2)"}
                        key={item.productId}
                        display={"flex"}
                        gap={"3rem"}
                        mb={"3rem"}
                        
                      >
                        <Box >
                          <img
                            style={{ width: "10rem" }}
                            src={item?.image}
                            alt={item?.name}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="h4"
                            mb={2}
                            fontSize={"2.3rem"}
                            color="black"
                          >
                            {item?.name}
                          </Typography>
                          <Box display={"flex"} gap={"2rem"}>
                            <Typography
                              style={{ textDecoration: "line-through" }}
                              fontSize={"2.3rem"}
                              color="black"
                            >
                              ₹{item?.price}
                            </Typography>
                            <Typography
                              variant="h3"
                              // fontSize={"2.3rem"}
                              color="black"
                            >
                              ₹{item?.priceAfterDiscount}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            fontSize={"2.3rem"}
                            color={"black"}
                          
                          >
                            Quantity: {item?.quantity}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
            <Box>
              <PriceDetails
                cartItems={cartItems}
                totalProductsPrice={orderInfoData?.totalProductsPrice}
                discount={orderInfoData?.discount}
                delivery={orderInfoData?.delivery}
                totalPrice={orderInfoData?.totalPrice}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ConfirmOrder;
