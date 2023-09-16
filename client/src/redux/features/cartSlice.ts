import {
  PayloadAction,
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
  cartItems: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: CartState = {
  cartItems: [],
  status: "idle",
  error: undefined,
};

// Create an async thunk for adding to the cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({
    quantity,
    productId,
    userId,
  }: {
    productId: string | undefined;
    quantity: number;
    userId: string | undefined;
  }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/cart/create-cart/${userId}`,
        {
          quantity,
          productId,
          userId,
        }
      );

      // The value we return becomes the `fulfilled` action payload
      return response.data.cartItems;
    } catch (error) {
      // Handle errors here, e.g., show an error alert
      console.error("Error adding item to cart:", error);
      throw error; // Rethrow the error to propagate it
    }
  }
);

export const fetchCartProducts = createAsyncThunk<CartItem[], string>(
  "cart/fetchCartProducts",
  async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/cart/fetch-cart/${userId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (cartId: string) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/cart/update-cart-quantity/${cartId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeCartProducts = createAsyncThunk(
  "cart/removeCartProducts",
  async (cartId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/cart/delete-cart/${cartId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
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
      .addCase(
        addToCartAsync.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.status = "succeeded";
          state.cartItems.push(action.payload); // Push the single category object
        }
      )
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateCartItemQuantity.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.status = "succeeded";
          state.cartItems.push(action.payload);
        }
      )
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCartProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })

      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeCartProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCartProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })

      .addCase(removeCartProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const selectItems = createSelector(
  [cartSelector],
  (cart) => cart.cartItems
);
export default cartSlice.reducer;
