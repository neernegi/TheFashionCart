import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
  phoneNo: number;
}

interface OrderItem {
  name: string;
  price: number;
  quantity: string;
  product: string; // Assuming product is represented by its ID (string)
}

interface PaymentInfo {
  id: string;
  status: string;
}
interface Order {
  _id: string;
  shippingInfo: ShippingInfo;
  orderItems: OrderItem[];
  user: string; // Assuming user is represented by its ID (string)
  paymentInfo: PaymentInfo;
  paidAt: Date;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  deliveredAt?: Date;
  createdAt: Date;
}

interface CreateOrderPayload {
  shippingInfo: ShippingInfo;
  orderItems: OrderItem[];
  paymentInfo: PaymentInfo;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

interface OrderState {
  order: Order | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: OrderState = {
  order: null,
  loading: "idle",
  error: undefined,
};

export const createOrder = createAsyncThunk<Order, CreateOrderPayload>(
  "/create-order",
  async () => {
    const response = await axios.get("/api/v1/order/allProducts");
    return response.data;
  }
);
export const getSingleOrder = createAsyncThunk<Order, CreateOrderPayload>(
  "/create-order",
  async () => {
    const response = await axios.get("/api/v1/order/allProducts");
    return response.data;
  }
);
export const getSellerOrder = createAsyncThunk<Order, CreateOrderPayload>(
  "/create-order",
  async () => {
    const response = await axios.get("/api/v1/order/allProducts");
    return response.data;
  }
);
export const updateOrder = createAsyncThunk<Order, CreateOrderPayload>(
  "/create-order",
  async () => {
    const response = await axios.get("/api/v1/order/allProducts");
    return response.data;
  }
);
export const deleteOrder = createAsyncThunk<Order, CreateOrderPayload>(
  "/create-order",
  async () => {
    const response = await axios.get("/api/v1/order/allProducts");
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.order = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getSellerOrder.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getSellerOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.order = action.payload;
      })
      .addCase(getSellerOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.order = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.order = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
