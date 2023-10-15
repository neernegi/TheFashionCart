import React, { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllOrders, Order } from "../../redux/features/orderSlice";
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

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const productFilter = products.filter((product) =>
    orders.some((order) =>
      order.orderItems.some((item) => item.productId === product._id)
    )
  );
  console.log(productFilter);

  return (
    <Fragment>
      <Box display={'flex'} gap={"3rem"}>
        <Box>
          {Array.isArray(productFilter)
            ? productFilter.map((prod) => (
                <>
                  <Box key={prod?._id}>
                    <img
                      style={{ width: "10rem" }}
                      src={prod?.images[0]?.url}
                      alt={prod?.name}
                    />
                  </Box>
                  <Typography fontSize={"2rem"} color={"black"}>
                    {prod?.name}
                  </Typography>
                </>
              ))
            : null}
        </Box>
        <Box>
          {Array.isArray(orders) ? (
            orders.map((order) => (
              <Box key={order._id} border={1} p={2} m={2}>

                
                <Typography fontSize={"2rem"} color={"black"}>{order?.totalPrice}</Typography>
                <Typography fontSize={"2rem"} color={"black"}>{order?.itemsPrice}</Typography>
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
