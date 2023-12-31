import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/categorySlice";
import subCategorySlice from "./features/subCategorySlice";
import userSlice from "./features/userSlice";
import sellerSlice from "./features/sellerSlice";
import productSlice from "./features/productSlice";
import bannerSlice from "./features/bannerSlice";
import cartSlice from "./features/cartSlice";

import orderSlice from "./features/orderSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    seller: sellerSlice,
    category: categorySlice,
    subCategory: subCategorySlice,
    product: productSlice,
    banner: bannerSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
