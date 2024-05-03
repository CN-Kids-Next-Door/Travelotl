import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const URL_APIBASE = `http://localhost:8080/`;

const baseQuery = fetchBaseQuery({
    baseUrl: URL_APIBASE,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().authState.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },

  })

export const apiSlice = createApi({
  baseQuery: baseQuery,
  reducerPath: `api`,
  endpoints: (builder) => ({}),
});

export default apiSlice;
