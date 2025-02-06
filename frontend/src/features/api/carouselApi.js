import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//create carouselApi slice
export const carouselApi = createApi({
  reducerPath: "carouselApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Carousel"],
  endpoints: (builder) => ({
    fetchCarouselImages: builder.query({
      query: () => "/carousel",
    }),

    // Upload carousel image to the backend
    uploadCarouselImage: builder.mutation({
      query: (formData) => ({
        url: "/carousel",
        method: "POST",
        body: formData,
      }),
    }),

    // Delete carousel image by ID
    deleteCarouselImage: builder.mutation({
      query: (id) => ({
        url: `/carousel/${id}`, // DELETE request to delete an image by ID
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchCarouselImagesQuery,
  useUploadCarouselImageMutation,
  useDeleteCarouselImageMutation,
} = carouselApi;
