// PriceDetails.tsx

import React from "react";
import { Box, Typography } from "@mui/material";
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
    <Box>
      <Typography variant="h2" fontSize={"2xl"} color={"black"}>
        Price Details
      </Typography>
      <Box display={"flex"} gap={"2rem"}>
        <Typography variant="h3" fontSize={"2xl"} color={"black"}>
          Price ({cartItems?.length} items)
        </Typography>
        <Typography variant="h3" fontSize={"2xl"} color={"black"}>
          Total Price: ₹{totalProductsPrice}
        </Typography>
      </Box>

      <Typography variant="h3" fontSize={"2xl"} color={"black"}>
        Discount: ₹{discount*cartItems?.length}
      </Typography>
      <Typography variant="h3" fontSize={"2xl"} color={"black"}>
        Delivery Charges:{""} ₹{delivery}
      </Typography>
      <Typography variant="h3" fontSize={"2xl"} color={"black"}>
        Total Amount: ₹{totalPrice}
      </Typography>
    </Box>
  );
};

export default PriceDetails;
