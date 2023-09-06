// In your bannerSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Banner = {
  image: {
    public_id: string;
    url: string;
  };
  _id: string;
};

export interface BannerState {
  banners: Banner[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: BannerState = {
  banners: [],
  status: "idle",
  error: undefined,
};

export const createBanner = createAsyncThunk(
  "banner/createBanner",
  async (formData: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/banner/createbanner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error("Error creating banner: " + error.message);
    }
  }
);

export const fetchBanner = createAsyncThunk("banner/fetchBanner", async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/banner/getbanner"
    );
    return response.data.banners; // Only return the banners array
  } catch (error: any) {
    throw new Error("Error fetching banners: " + error.message);
  }
});

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banners.push(action.payload); // Push the new banner object
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banners = action.payload; // Replace the entire banners array
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the category selector and reducer
export const bannerSelector = (state: RootState) => state.banner;
export default bannerSlice.reducer;
