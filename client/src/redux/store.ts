import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/categorySlice";
import subCategorySlice from "./features/subCategorySlice";
import userSlice from "./features/userSlice";
import sellerSlice from "./features/sellerSlice";
import productSlice from "./features/productSlice";
import bannerSlice from "./features/bannerSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    seller:sellerSlice,
    category: categorySlice,
    subCategory: subCategorySlice,
    product:productSlice,
    banner:bannerSlice
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
