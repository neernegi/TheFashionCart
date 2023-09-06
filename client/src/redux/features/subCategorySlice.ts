import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type SubCategory = {
  _id: null | undefined;
  value:string
  label: string;
  name:string
};



export interface SubCategoryState {
  subCategories: SubCategory[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: SubCategoryState = {
  subCategories: [],
  status: "idle",
  error: undefined,
};

export const createSubCategory = createAsyncThunk(
  "subCategories/createSubCategory",
  async ({
    categoryName,
    subCategoryNames,
  }: {
    categoryName: string;
    subCategoryNames: string[];
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/category/create-subcategory",
        {
          categoryName,
          subCategoryNames,
        }
      );
      return response.data.newSubCategories;
    } catch (error: any) {
      throw new Error("Error creating subcategories: " + error.message);
    }
  }
);

export const fetchSubCategories = createAsyncThunk(
  "subcategories/fetchSubcategories",
  async (categoryName: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/category/get-subcategories/${categoryName}`
      );
      console.log(response)
      return response.data;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }
);


const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSubCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createSubCategory.fulfilled,
        (state, action: PayloadAction<SubCategory[]>) => {
          state.status = "succeeded";
          state.subCategories = action.payload.map((subCategory: SubCategory) => ({
            value: subCategory.value,
            label: subCategory.label,
            name:subCategory.name,
            _id:subCategory._id
          }));
        }
      )
      .addCase(createSubCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const subCategorySelector = (state: RootState) => state.subCategory;
export default subCategorySlice.reducer;
