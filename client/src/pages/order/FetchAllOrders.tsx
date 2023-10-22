import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllOrders, Order, OrderItem } from "../../redux/features/orderSlice";
import Box from "@mui/material/Box";
import { useAuth } from "../context/useAuth";
import { fetchProducts } from "../../redux/features/productSlice";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating, TextField, Typography } from "@mui/material";
import axios from "axios";

const FetchAllOrders = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");

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
  const submitReviewToggle = () => {
    setOpen(!open);
  };

  // const reviewSubmitHandler = async () => {
  //   const myForm = new FormData();
  //   myForm.set("rating", rating);
  //   myForm.set("comment", comment);
  //   myForm.set("productId", id); // Assuming `id` is the product ID

  //   try {
  //     const config = {
  //       headers: { "Content-Type": "application/json" },
  //     };

  //     const { data } = await axios.put(`/api/v1/review`, myForm, config);
  //     setOpen(false);
  //   } catch (error) {
  //     // Handle the error
  //     console.log(error)
  //   }
  // };

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
                <Typography fontSize="2rem" color="black">Rate and Review</Typography>
                <h3 className="reviewsHeading">REVIEWS</h3>
{/* 
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <TextField
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog> */}
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
