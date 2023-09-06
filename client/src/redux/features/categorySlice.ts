import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { SubCategory } from "./subCategorySlice";

// Define the category structure
export interface Category {
  _id: string;
  value: any;
  label: string;
  name: string;
  avatar: {
    public_id: string;
    url: string;
  };
  subCategories: SubCategory[];
}

// Define the category state
export interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  selectedCategory: null;
}

const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: undefined,
  selectedCategory: null,
};

// Define the createCategory async thunk
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (formData: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.category;
    } catch (error: any) {
      throw new Error("Error creating category: " + error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/get-all-category"
      );

      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }
);

// Create the category slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.status = "succeeded";
          state.categories.push(action.payload); // Push the single category object
        }
      )
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.map((category: any) => ({
          value: category.name,
          label: category.name,
          _id: category._id,
          avatar: category.avatar,
          subCategories: category.subCategories,
        }));
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || undefined;
      });
  },
});

// Export the category selector and reducer
export const { setSelectedCategory } = categorySlice.actions;
export const categorySelector = (state: RootState) => state.category;
export default categorySlice.reducer;
