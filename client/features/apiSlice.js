import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const URL_APIBASE = `http://localhost:8080/`;

const baseQuery = fetchBaseQuery({
    baseUrl: `/`,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },

  })

export const apiSlice = createApi({
  baseQuery,
  reducerPath: `${URL_APIBASE}`,
  endpoints: (builder) => ({}),
});

export default apiSlice;
