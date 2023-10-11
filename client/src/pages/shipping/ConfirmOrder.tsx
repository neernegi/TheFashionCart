import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/features/orderSlice";

const ConfirmOrder = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orderInfo = useAppSelector((state) => state.order.order);
  const cart = useAppSelector((state) => state.cart.cartItems);
  const shippingAddress = useAppSelector((state) => state.shipping.shipping);
  

  return (
    <Box>
      <Box>
        <Typography fontSize={"2rem"} color={"black"}>
          {shippingAddress?.phoneNo}
        </Typography>
        <Typography fontSize={"2rem"} color={"black"}>
          {shippingAddress?.address}
        </Typography>
        <Typography fontSize={"2rem"} color={"black"}>
          {shippingAddress?.city}
        </Typography>
        <Typography fontSize={"2rem"} color={"black"}>
          {shippingAddress?.pinCode}
        </Typography>
        <Typography fontSize={"2rem"} color={"black"}>
          {shippingAddress?.state}
        </Typography>
        <Typography fontSize={"2rem"} color={"black"}>
          {shippingAddress?.country}
        </Typography>
      </Box>
      <Box>
        {/* Display order summary, including itemsPrice, shippingPrice, taxPrice, and totalPrice */}
      </Box>
      {/* <button onClick={placeOrderHandler}>Place Order</button> */}
    </Box>
  );
};

export default ConfirmOrder;
