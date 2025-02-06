import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mini-ecommerce-2-i92a.onrender.com/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "Category"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, product }) => ({
        url: `/products/update/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getProductsByCategory: builder.query({
      query: (category) => `/products/category/${category}`, // Updated to match new endpoint
      providesTags: (result, error, category) => [
        { type: "Product", id: category },
      ],
    }),
    // New endpoint for fetching categories
    getAllCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsByCategoryQuery,
  useGetAllCategoriesQuery,
} = productApi;
