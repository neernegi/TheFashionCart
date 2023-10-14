import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllOrders, Order } from "../../redux/features/orderSlice";
import Box from "@mui/material/Box";
import { useAuth } from "../context/useAuth";

const FetchAllOrders = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAuth();
  const orders = useAppSelector((state) => state.order.orders);
  console.log(orders)
  const userId = auth?.user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllOrders(userId));
    }
  }, [dispatch, userId]);

  return (
    <div>
      {Array.isArray(orders) ? (
        orders.map((order) => (
          <Box key={order._id} border={1} p={2} m={2}>
            <div>Name: {order?.shippingInfo?.address}</div>
            <div>Total Price: ${order.totalPrice}</div>
          </Box>
        ))
      ) : (
        <div>No orders found.</div>
      )}
    </div>
  );
};

export default FetchAllOrders;
