import { apiSlice } from "./apiSlice.js";

const URL_APIBASE = `api`;
const URL_API `itnry`

export const itnryApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    getItineraries: builder.query({
      query: (userId) => `/${URL_APIBASE}/${userId}/${URL_API}/all`,
      providesTags: ['Itnry'],
    }),

    getProfileImage: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/${URL_APIBASE}/${userId}/${URL_API}/profileimage`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Itnry'],
    }),

    getItnryImage: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/${URL_APIBASE}/${userId}/${URL_API}/itnryimage`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Itnry'],
    }),

    getItinerary: builder.query({
      query: ({ userId, itnryId }) => `/${URL_APIBASE}/${userId}/${URL_API}/${itnryId}`,
      providesTags: (result, error, { itnryId }) => [{ type: 'Itnry', id: itnryId }],
    }),

    addItinerary: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/${URL_APIBASE}/${userId}/${URL_API}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Itnry'],
    }),

    updateItinerary: builder.mutation({
      query: ({ userId, itnryId, data }) => ({
        url: `/${URL_APIBASE}/${userId}/${URL_API}/${itnryId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { itnryId }) => [{ type: 'Itnry', id: itnryId }],
    }),

    deleteItinerary: builder.mutation({
      query: ({ userId, itnryId }) => ({
        url: `/${URL_APIBASE}/${userId}/${URL_API}/${itnryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Itnry'],
    }),
  }),
});

export const {
  useGetItinerariesQuery,
  useGetProfileImageMutation,
  useGetItnryImageMutation,
  useGetItineraryQuery,
  useAddItineraryMutation,
  useUpdateItineraryMutation,
  useDeleteItineraryMutation
} = itnryApiSlice;