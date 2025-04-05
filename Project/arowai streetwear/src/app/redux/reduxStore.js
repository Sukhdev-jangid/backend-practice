import { configureStore } from "@reduxjs/toolkit";
import parentCategorySlice from "./slices/parentCategorySlice";
import  productSlice  from "./slices/productSlice";
import  userSlice  from "./slices/userSlice";
import  cartSlice  from "./slices/cartSlice";

export const reduxStore = configureStore({
    reducer: {
        parentCategory: parentCategorySlice,
        products:productSlice,
        user:userSlice,
        cart:cartSlice
    }
});