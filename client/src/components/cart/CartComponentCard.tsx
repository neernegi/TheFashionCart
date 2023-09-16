import React from "react";
import { Box, Typography } from "@mui/material";
import { Product } from "../../redux/features/productSlice";

interface CartComponentCardProps {
  cartProduct: Product | undefined;
}

const CartComponentCard: React.FC<CartComponentCardProps> = ({
  cartProduct,
}) => {
  if (!cartProduct) return null; // Handle the case where cartProduct is undefined

  return (
    <Box>
      <Box display={"flex"} gap={"4rem"} m={"3rem"} key={cartProduct._id}>
        {cartProduct.images.length > 0 && (
          <Box mb={"4rem"}>
            <img
              style={{ width: "10rem" }}
              src={cartProduct.images[0]?.url}
              alt={cartProduct.name}
            />
          </Box>
        )}
        <Box>
          <Typography mb={"2rem"} variant="h5" color={"black"}>
            {cartProduct?.name}
          </Typography>
          <Typography variant="h5" color={"black"}>
            {cartProduct?.price}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartComponentCard;
