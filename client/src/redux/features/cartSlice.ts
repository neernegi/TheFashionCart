import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Item {
  // Define the structure of your item here
  id: number;
  name: string;
  // ...other properties
}

export interface CartState {
  items: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  cartLoaded: boolean;
}

const initialState: CartState = {
  status: "idle",
  items: [],
  cartLoaded: false,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ item, alert }: { item: string; alert: any }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/cart",
        {
          item: item, // Assuming 'item' is the key for the item data
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert.success("Item Added to Cart");

      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., show an error alert
      console.error("Error adding item to cart:", error);
      throw error; // Rethrow the error to propagate it
    }
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/cart");
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., show an error message or log the error
      console.error("Error fetching items by user ID:", error);
      throw error; // Rethrow the error to propagate it further if needed
    }
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    try {
      const response = await axios.patch(`/cart/${update}`, update, {
        headers: { "Content-Type": "application/json" },
      });

      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., show an error message or log the error
      console.error("Error updating cart:", error);
      throw error; // Rethrow the error to propagate it further if needed
    }
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/cart/${itemId}`
      );

      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., show an error message or log the error
      console.error("Error deleting item from cart:", error);
      throw error; // Rethrow the error to propagate it further if needed
    }
  }
);

// Uncomment the resetCart function and resetCartAsync async thunk if needed
// export function resetCart() {
//   // get all items of the user's cart - and then delete each
//   return new Promise(async (resolve) => {
//     const response = await fetchItemsByUserIdAsync();
//
//     const items = response;
//     for (let item of items) {
//       await deleteItemFromCart(item.id);
//     }
//     resolve({ status: "success" });
//   });
// }
//
// export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
//   const response = await fetchItemsByUserIdAsync();
//
//   const items = response;
//   for (let item of items) {
//     await deleteItemFromCart(item.id);
//   }
//   return response;
// });

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
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      });
    //   .addCase(resetCartAsync.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(resetCartAsync.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     state.items = [];
    //   });
  },
});

export const selectItems = (state: RootState) => state.cart.items;
export const selectCartStatus = (state: RootState) => state.cart.status;
export const selectCartLoaded = (state: RootState) => state.cart.cartLoaded;

export default cartSlice.reducer;
