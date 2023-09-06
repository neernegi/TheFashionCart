import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface Seller {
  token: string;
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: {
    public_id: string;
    url: string;
  };
}


interface SellerState {
  seller: Seller | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SellerState = {
  seller: null,
  loading: "idle",
  error: null,
};

export interface RegisterSellerPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  shopName: string;
  description: string;
  pickupAddress: {
    address: string;
    street: string;
    nearBy: string;
  };
  city: string;
  pincode: number;
  state: string;
  country: string;
}

type LoginSellerPayload = {
  email: String;
  password: String;
};

interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const registerSeller = createAsyncThunk(
  "/seller-register",
  async (formData: FormData) => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/seller/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.seller;
  }
);

export const loginSeller = createAsyncThunk<Seller, LoginSellerPayload>(
  "/seller-login",
  async (data) => {
    const response = await axios.post("http://localhost:8080/api/v1/seller/login", data);
    return response.data;
  }
);

export const updateSellerPassword = createAsyncThunk<
  Seller,
  UpdatePasswordPayload
>("/update-seller-password", async (passwordData) => {
  const response = await axios.post(
    "/api/v1/seller/password-update",
    passwordData
  );
  return response.data.seller;
});
export const updateSellerProfile = createAsyncThunk<Seller>(
  "/update-seller-profile",
  async (updateProfile) => {
    const response = await axios.post(
      "/api/v1/seller/update-profile",
      updateProfile
    );
    return response.data.seller;
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerSeller.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.seller = action.payload;
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })
      .addCase(loginSeller.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.seller = action.payload;
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateSellerPassword.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateSellerPassword.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.seller = action.payload;
      })
      .addCase(updateSellerPassword.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const sellerSelector = (state: RootState) => state.seller;
export default sellerSlice.reducer;
