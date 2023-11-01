// PriceDetails.tsx

import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { CartItem } from "../redux/features/cartSlice";

interface PriceDetailsProps {
  cartItems: CartItem[];
  totalProductsPrice: number;
  discount: number;
  delivery: number;
  totalPrice: number;
}

const PriceDetails: React.FC<PriceDetailsProps> = ({
  cartItems,
  totalProductsPrice,
  discount,
  delivery,
  totalPrice,
}) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"2rem"}
      position={"sticky"}
      p={"4rem"}
      sx={{ boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)" }}
    >
      <Typography variant="h2" fontSize={"2xl"} color={"black"}>
        Price Details
      </Typography>
      <Divider />
      <Box display={"flex"} gap={"13.4rem"}>
        <Typography variant="h3" fontSize={"2xl"} color={"gray"}>
          Price ({cartItems?.length} items)
        </Typography>
        <Typography variant="h3" fontSize={"2xl"} color={"gray"}>
          ₹{totalProductsPrice}
        </Typography>
      </Box>
      <Box display={"flex"} gap={"21.5rem"}>
        <Typography variant="h3" fontSize={"2xl"} color={"grey"}>
          Discount
        </Typography>
        <Typography variant="h3" fontSize={"2xl"} color={"gray"}>
          ₹{discount * cartItems?.length}
        </Typography>
      </Box>
      <Box display={"flex"} gap={"10.4rem"}>
        {" "}
        <Typography variant="h3" fontSize={"2xl"} color={"gray"}>
          Delivery Charges
        </Typography>
        <Typography variant="h3" fontSize={"2xl"} color={"gray"}>
          ₹{delivery}
        </Typography>
      </Box>
      <Divider />
      <Box display={"flex"} gap={"16rem"}>
        <Typography variant="h3" fontSize={"2xl"} color={"black"}>
          Total Amount
        </Typography>
        <Typography variant="h3" fontSize={"2xl"} color={"black"}>
          ₹{totalPrice}
        </Typography>
      </Box>
    </Box>
  );
};

export default PriceDetails;
