import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

// export interface Seller {
//   token: string;
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   avatar: {
//     public_id: string;
//     url: string;
//   };
// }

export interface Seller {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: {
    public_id: string;
    url: string;
  };
  token: string;
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
  role: string;
  _id: string;
}

interface SellerState {
  seller: Seller | null;
  isAuthenticated: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SellerState = {
  seller: null,
  isAuthenticated: false,
  loading: "idle",
  error: null,
};

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

export const addSellerDetails = createAsyncThunk(
  "/seller-add-seller-details",
  async ({formData,sellerId}:{formData: FormData,sellerId:string}) => {
    const response = await axios.post(
      `http://localhost:8080/api/v1/seller/seller-details/${sellerId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data)
    return response.data.seller;
  }
);

export const loginSeller = createAsyncThunk<Seller, LoginSellerPayload>(
  "/seller-login",
  async (data) => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/seller/login",
      data
    );
    return response.data;
  }
);

export const fetchSellerDetail = createAsyncThunk<Seller, string>(
  "/seller-detail",
  async (sellerId: string) => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/seller/get-seller-details/${sellerId}`
    );
    console.log(response.data);
    return response.data.seller;
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
        state.isAuthenticated = true;
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addSellerDetails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(addSellerDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.seller = action.payload;
      })
      .addCase(addSellerDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })

      .addCase(loginSeller.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.seller = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchSellerDetail.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchSellerDetail.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.seller = action.payload;
      })
      .addCase(fetchSellerDetail.rejected, (state, action) => {
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
