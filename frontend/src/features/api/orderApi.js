import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mini-ecommerce-uv5h.onrender.com/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders/create",
        method: "POST",
        body: orderData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => {
        if (response.orderId) {
          return { ...response, success: true };
        } else {
          throw new Error("Order creation failed: No orderId received");
        }
      },
      transformErrorResponse: (response) => response.data,
    }),
    getOrders: builder.query({
      query: () => ({
        url: "/orders/all-orders",
      }),
    }),
    getUserOrders: builder.query({
      query: () => "/orders/user-order",
      providesTags: (result, error, arg) => ["UserOrder"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/update/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useUpdateOrderMutation,
} = ordersApi;
