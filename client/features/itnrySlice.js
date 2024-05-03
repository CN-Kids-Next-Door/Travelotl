import { apiSlice } from "./apiSlice.js";
import { setItineraries } from './state_itnrySlice';

const URL_APIBASE = `api`;
const URL_API = `itnry`;

export const itnryApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({


    getItineraries: builder.query({
      // GET REQUEST TO BACKEND
      query: ({ userId }) => {
        console.log('Making API call for getItineraries with userId:', userId);

        if (!userId) {
          throw new Error('User ID is required to fetch itineraries');
        }
        console.log('Received args in query:', userId);
        return `/${URL_APIBASE}/${userId}/${URL_API}/all`;
      },
      providesTags: ['Itnry'],
      // ON getItineraries REQUEST RETURN MSG, UPDATE itnryState
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setItineraries(data));
        } catch (error) {
          console.error('Failed to fetch itineraries:', error);
        }
      },
    }),


    getProfileImage: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/${URL_APIBASE}/${userId}/${URL_API}/profileimage`,
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: ['Itnry'],
    }),


    getItnryImage: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/${URL_APIBASE}/${userId}/${URL_API}/itnryimage`,
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: ['Itnry'],
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


    editItinerary: builder.mutation({
      // PATCH REQUEST TO BACKEND TO SEND UPDATED ITINERARY TO DB
      query: ({ userId, itnryId, data }) => ({
        url: `/${URL_APIBASE}/${userId}/${URL_API}/${itnryId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Itnry'],
      // ON EDIT REQUEST RETURN MSG, UPDATE itnryState
      onQueryStarted: async ({ itnryId, data }, { queryFulfilled, dispatch }) => {
        try {
          const { data: updatedItinerary } = await queryFulfilled;
          dispatch(updateItinerary(updatedItinerary));
        } catch (error) {
          console.error('Failed to update itinerary:', error);
        }
      },
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
  useGetItinerariesQuery,   // Sort of complete🟡
  useGetProfileImageMutation,
  useGetItnryImageMutation,
  useGetItineraryQuery,
  useAddItineraryMutation,
  useEditItineraryMutation,    // Sort of complete🟡
  useDeleteItineraryMutation    // Sort of complete🟡
} = itnryApiSlice;