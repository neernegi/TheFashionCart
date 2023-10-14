import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const OrderSuccessContainer = styled("div")({
  margin: "auto",
  textAlign: "center",
  padding: "10vmax",
  height: "50vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "@media (max-width: 600px)": {
    padding: "3vw",
  },
});

const CheckIcon = styled(CheckCircleIcon)({
  fontSize: "7vmax",
  color: "tomato",
  "@media (max-width: 600px)": {
    fontSize: "20vw",
  },
});

const Message = styled(Typography)({
  fontSize: "2vmax",
  "@media (max-width: 600px)": {
    fontSize: "5vw",
    margin: "2vmax",
  },
});

const LinkButton = styled(Link)({
  backgroundColor: "rgb(51, 51, 51)",
  color: "white",
  border: "none",
  padding: "1vmax 3vmax",
  cursor: "pointer",
  fontFamily: "Roboto",
  textDecoration: "none",
  margin: "2vmax",
  "@media (max-width: 600px)": {
    padding: "3vw 6vw",
    fontFamily: "Roboto",
    margin: "2vmax",
  },
});

const OrderSuccess = () => {
  return (
    <OrderSuccessContainer>
      <CheckIcon />
      <Message>Your Order has been Placed successfully</Message>
      <LinkButton to="/orders">View Orders</LinkButton>
    </OrderSuccessContainer>
  );
};

export default OrderSuccess;
