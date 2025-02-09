import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mini-ecommerce-uv5h.onrender.com/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    submitMessage: builder.mutation({
      query: (data) => ({
        url: "contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
    fetchMessages: builder.query({
      query: () => "admin/messages",
      // Add this transformResponse function to handle various response formats
      transformResponse: (response) => {
        // If the response is already an array, return it directly
        if (Array.isArray(response)) return response;
        // If the response has a 'data' property with the array, return that
        if (response.data && Array.isArray(response.data)) return response.data;
        // If neither, return an empty array or handle as needed
        return [];
      },
      providesTags: ["Contact"],
    }),
  }),
});

export const { useSubmitMessageMutation, useFetchMessagesQuery } = contactApi;
