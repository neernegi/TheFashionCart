import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  ratings: number;
  avatar: {
    length: number;
    public_id: string;
    url: string;
    _id: string;
  }[];
  category: string;
  subcategory: string;
  brand: string;
  Stock: number;
  marketplace: String;
  numOfReviews: number;
  reviews: {
    name: string;
    rating: number;
    comment: string;
    _id: string;
  }[];
  seller: string;
  qcStatus: string;
  createdAt: string;
}

interface ProductState {
  product: Product | undefined;
  products: Product[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: ProductState = {
  product: undefined,
  products: [],
  loading: "idle",
  error: undefined,
};

// Create an async thunk action to fetch all products
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetch-all-Products",
  async () => {
    const response = await axios.get(
      "http://localhost:8080/api/v1/product/allProducts"
    );
    console.log(response.data);
    return response.data.products;
  }
);
export const fetchSearchProducts = createAsyncThunk<Product[], string>(
  "products/fetch-search-Products",
  async (keyword: string) => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/product/allProducts?keyword=${keyword}`
    );
    console.log(response.data);
    return response.data.products;
  }
);
export const getSingleProductDetails = createAsyncThunk<Product, string>(
  "products/get-single-product-detail",
  async (productId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/product/product-detail/${productId}`
      );
      console.log(response.data);
      return response.data.product;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  }
);

export const fetchCategoryFilterProducts = createAsyncThunk<Product[], string>(
  "products/fetchCategoryFilterProducts", // Update the action name
  async (categoryId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/product/category-filter-products/${categoryId}`
      );
      console.log(response.data.products);
      return response.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
);

export const fetchSubcategoryFilterProducts = createAsyncThunk<
  Product[],
  string
>(
  "products/fetchsubcategoryFilterProducts", // Update the action name
  async (subcategoryId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/product/subcategory-filter-products/${subcategoryId}`
      );
      console.log(response.data.products);
      return response.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
);

// Create an async thunk action to create a new product
export const createProduct = createAsyncThunk(
  "product/create-product",
  async ({
    formData,
    sellerId,
  }: {
    formData: FormData;
    sellerId: string | undefined;
  }) => {
    const response = await axios.post(
      `http://localhost:8080/api/v1/product/create/${sellerId}/new-products`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.product;
  }
);
// export const UpdateProductQc = createAsyncThunk(
//   "product/update-product-qc",
//   async ({ qc, productId }: { qc: FormData; productId: string }) => {
   
// );

// Seller Products
export const fetchSellerProducts = createAsyncThunk<Product[], string>(
  "product/get-seller-products",
  async (sellerId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/product/seller-products/${sellerId}`
      );
      console.log(response.data.products);
      return response.data.products;
    } catch (error) {
      console.error("Error fetching seller products:", error);
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSearchProducts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getSingleProductDetails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getSingleProductDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.product = action.payload;
      })
      .addCase(getSingleProductDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategoryFilterProducts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCategoryFilterProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchCategoryFilterProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products.push(action.payload); // Add the new product to the state
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      // .addCase(UpdateProductQc.pending, (state) => {
      //   state.loading = "pending";
      // })
      // .addCase(UpdateProductQc.fulfilled, (state, action) => {
      //   state.loading = "succeeded";
      //   state.products.push(action.payload); // Add the new product to the state
      // })
      // .addCase(UpdateProductQc.rejected, (state, action) => {
      //   state.loading = "failed";
      //   state.error = action.error.message;
      // });
  },
});

export const productSelector = (state: RootState) => state.product;
export default productSlice.reducer;
