import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface ShippingInfoProps {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number | undefined;
  phoneNo: string;
}

export interface OrderItem {
  _id?: string;
  name: string;
  price: number;
  priceAfterDiscount: number;
  image: string;
  quantity: number;
  productId: string;
  orderStatus?: string;
  cartId: string;
}

export interface PaymentInfo {
  id?: string;
  status?: string;
}

export interface Order {
  _id?: string | undefined;
  shippingInfo: ShippingInfoProps;
  orderItems: OrderItem[];
  paymentInfo: PaymentInfo;
  shippingPrice: number;
  totalPrice: number;
}

export interface OrderInfoState {
  order: Order | null;
  orders: Order[]; // To store a list of orders
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: OrderInfoState = {
  order: null,
  orders: [],
  status: "idle",
  error: undefined,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ order, userId }: { order: Order; userId: String | undefined }) => {
    try {
      await axios.post(
        `http://localhost:8080/api/v1/order/user-create/new-order/${userId}`,
        order
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchAllOrders = createAsyncThunk<Order[], string>(
  "order/fetchAllOrders",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/order/user-orders/${userId}`
      );
      return response.data.orders;
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
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const orderSelector = (state: RootState) => state.order;

export default orderSlice.reducer;
