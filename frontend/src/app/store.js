import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/api/userApi";
import { productApi } from "../features/api/productApi";
import authReducer from "../features/slice/authSlice";
import cartReducer from "../features/slice/cartSlice";
import { carouselApi } from "../features/api/carouselApi";
import { ordersApi } from "../features/api/orderApi";
import { contactApi } from "../features/api/messageApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [userApi.reducerPath]: userApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [carouselApi.reducerPath]: carouselApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      ordersApi.middleware,
      carouselApi.middleware,
      contactApi.middleware
    ),
});
