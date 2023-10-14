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

const Payment = () => {
  const orderInfoData = sessionStorage.getItem("orderInfo");
  const orderInfo = orderInfoData ? JSON.parse(orderInfoData) : null;
  const shippingInfoData = sessionStorage.getItem("selectedShippingInfo");
  const shippingInfo = shippingInfoData ? JSON.parse(shippingInfoData) : null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef<HTMLButtonElement | null>(null);
  const cartItem = useAppSelector((state) => state.cart.cartItems);
  const user = useAppSelector((state) => state.user.user);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
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
          navigate("/success");
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
            <CardNumberElement className="paymentInput" />
          </Box>
          <Box>
            <CalendarMonthIcon />
            <CardExpiryElement className="paymentInput" />
          </Box>
          <Box>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </Box>

          <Button
            className="paymentFormBtn"
            style={{
              marginTop: "3rem",
              width: "18rem",
              height: "4rem",
              fontSize: "2rem",
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
