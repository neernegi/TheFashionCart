import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { Fragment, useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  CardNumberElement,
  CardCvcElement,
  useStripe,
  useElements,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import "./payment.css";
import { useNavigate } from "react-router-dom";
import {
  createOrder,
  PaymentInfo,
  Order,
  OrderItem,
} from "../../redux/features/orderSlice";
import { useAuth } from "../context/useAuth";

const Payment = () => {
  // const cartInfoData = localStorage.getItem("cartQuantities");
  // const cartItems = cartInfoData ? JSON.parse(cartInfoData) : null;
  const shippingInfoData = sessionStorage.getItem("selectedShippingInfo");
  const shippingInfo = shippingInfoData ? JSON.parse(shippingInfoData) : null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const { auth } = useAuth();
  const elements = useElements();
  const payBtn = useRef<HTMLButtonElement | null>(null);
  // const cartItem = useAppSelector((state) => state.cart.cartItems);
  // const cartItems = cartItem.map((item) => ({
  //   quantity: item.quantity,
  //   productId: item.productId, // Assuming `product` is the productId
  // }));
  // console.log(cartItem);
  const user = useAppSelector((state) => state.user.user);
  const userId = auth?.user?._id;

  const orderInfoData = sessionStorage.getItem("orderInfo");
  const orderInfo = orderInfoData ? JSON.parse(orderInfoData) : null;

  let orderItems = [];

  if (orderInfo) {
    orderItems = orderInfo.orderDetails.map((orderDetail: OrderItem) => ({
      name: orderDetail?.name,
      price: orderDetail?.price,
      priceAfterDiscount: orderDetail?.priceAfterDiscount,
      image: orderDetail?.image,
      quantity: orderDetail?.quantity,
      productId: orderDetail?.productId,
      cartId: orderDetail?.cartId,
    }));

    console.log(orderItems);
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems,
    shippingPrice: orderInfo?.delivery,
    totalPrice: orderInfo?.totalPrice,
    paymentInfo: {} as PaymentInfo,
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    payBtn.current?.setAttribute("disabled", "true");

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/payment/payment-process",
        paymentData
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const paymentMethod = elements.getElement(CardNumberElement);
      if (!paymentMethod) {
        // Handle the case where the card element is missing
        payBtn.current?.removeAttribute("disabled");
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: paymentMethod,
          billing_details: {
            name: user?.name,
            email: user?.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: "IN",
            },
          },
        },
      });
      if (result.error) {
        payBtn.current?.removeAttribute("disabled");

        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder({ order, userId }));

          navigate("/success");

          localStorage.removeItem("cartItems");
          sessionStorage.removeItem("orderInfo");
        } else {
          alert("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current?.removeAttribute("disabled");
    }
  };

  return (
    <Fragment>
      <Box
        display={"flex"}
        justifyContent={"center"}
        mt={"5rem"}
        width={"100%"}
        className="paymentContainer"
      >
        <form className="paymentForm">
          <Typography fontSize={"2rem"} color={"black"}>
            Card Info
          </Typography>
          <Box>
            <CreditCardIcon />
            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: "40px",
                  },
                },
              }}
              className="paymentInput"
            />
          </Box>
          <Box>
            <CalendarMonthIcon />
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    fontSize: "40px",
                  },
                },
              }}
              className="paymentInput"
            />
          </Box>
          <Box>
            <VpnKeyIcon />
            <CardCvcElement
              options={{
                style: {
                  base: {
                    fontSize: "40px",
                  },
                },
              }}
              className="paymentInput"
            />
          </Box>

          <Button
            className="paymentFormBtn"
            fullWidth
            style={{
              // width: "18rem",
              height: "4rem",
              fontSize: "2.3rem",
            }}
            variant="contained"
            onClick={submitHandler}
          >{`Pay - ${orderInfo && orderInfo.totalPrice}`}</Button>
        </form>
      </Box>
    </Fragment>
  );
};

export default Payment;
