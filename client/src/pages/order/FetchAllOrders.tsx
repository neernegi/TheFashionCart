import React, { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllOrders, Order, OrderItem } from "../../redux/features/orderSlice";
import Box from "@mui/material/Box";
import { useAuth } from "../context/useAuth";
import { fetchProducts } from "../../redux/features/productSlice";
import { Typography } from "@mui/material";

const FetchAllOrders = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAuth();
  const orders = useAppSelector((state) => state.order.orders);
  const products = useAppSelector((state) => state.product.products);

  console.log(orders);
  const userId = auth?.user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllOrders(userId));
    }
  }, [dispatch, userId]);

  return (
    <Fragment>
      <Box margin={'10rem'}>
        <Box>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <Box key={order._id} border={1} p={2} m={2}>
                {order?.orderItems.map((item: OrderItem) => (
                  <Box key={item._id} display={'flex'} gap={'4rem'} mb={'3rem'} > 
                    <Box>
                      <img style={{ width: "10rem" }} src={item?.image} alt={item?.name} />
                    </Box>
                    <Typography fontSize="2rem" color="black">
                      {item?.name}
                    </Typography>
                    <Typography fontSize="2rem" color="black">
                      {item?.priceAfterDiscount}
                    </Typography>
                    <Typography fontSize="2rem" color="green">
                      {item?.orderStatus}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))
          ) : (
            <div>No orders found.</div>
          )}
        </Box>
      </Box>
    </Fragment>
  );
};

export default FetchAllOrders;
