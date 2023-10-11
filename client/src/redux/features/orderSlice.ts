import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ShippingInfoProps } from "./ShippingSlice";
import { RootState } from "../store";

// interface OrderItem {
//   name: string;
//   price: number;
//   quantity: string;
//   product: string; // Assuming product is represented by its ID (string)
// }

// interface PaymentInfo {
//   id: string;
//   status: string;
// }

export interface OrderInfoProps {
  shippingInfo: ShippingInfoProps;
  orderItems: {
    name: string;
    price: string;
    quantity: number;
    image: string;
    productId: string;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    orderStatus: string;
  };
}

export interface OrderInfoState {
  order: OrderInfoProps | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: OrderInfoState = {
  order: null,
  status: "idle",
  error: undefined,
};
export const createOrder = createAsyncThunk<OrderInfoProps, string>(
  "order/createOrder", // Update the action name
  async (userId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/order/user-create/new-order/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading"; // Update to "status"
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const orderSelector = (state: RootState) => state.order;

export default orderSlice.reducer;
