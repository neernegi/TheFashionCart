import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface CartItem {
  productId: string;
  userId: string;
  quantity: number;
  _id: string;
}

export interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: undefined,
};

// Define your authentication token variable (retrieve it from where you store it)
const authToken = localStorage.getItem("auth"); // Retrieve the token from storage

let token: null = null; // Initialize token as null

if (authToken) {
  const userData = JSON.parse(authToken);
  token = userData.token;
}

console.log(token);

// Create an async thunk for adding to the cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({
    productId,
    quantity,
    userId,
  }: {
    productId: string;
    quantity: number;
    userId: string |undefined;
  }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/cart/create-cart/${userId}`,
        {
          productId,
          quantity,
          userId,
        }
      );

      // The value we return becomes the `fulfilled` action payload
      return response.data.cartItem;
    } catch (error) {
      // Handle errors here, e.g., show an error alert
      console.error("Error adding item to cart:", error);
      throw error; // Rethrow the error to propagate it
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { productId, quantity, userId, _id } = action.payload;
        state.items.push({ productId, quantity, userId, _id });
      })

      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const selectItems = createSelector([cartSelector], (cart) => cart.items);
export default cartSlice.reducer;
