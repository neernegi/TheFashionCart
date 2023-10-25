import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useAuth } from "../../context/useAuth";
import { fetchSellerOrders } from "../../../redux/features/orderSlice";
import OrderSellerTable from "../../../components/OrderSellerTable";

const UpdateActiveOrders = () => {
  const { auth } = useAuth();
  const sellerId = auth?.user?._id;
  console.log(sellerId);
  const dispatch = useAppDispatch();
  const sellerOrders = useAppSelector((state) => state.order.orders);
  console.log(sellerOrders);

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchSellerOrders(sellerId));
    }
  }, [sellerId]);
  console.log(sellerOrders);

  const filteredProducts = sellerOrders.filter((product) =>
    product?.orderItems?.filter((item) => item?.orderStatus === "Processing")
  );
  console.log(filteredProducts);
  return (
    <Box>
      <OrderSellerTable orders={filteredProducts} />
    </Box>
  );
};

export default UpdateActiveOrders;
