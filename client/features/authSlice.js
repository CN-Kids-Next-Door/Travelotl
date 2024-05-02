import { apiSlice } from "./apiSlice.js";
import { setUserInfo, setToken } from './state_authSlice.js';
const URL_AUTH = "auth";

// MUTATION OPTIONS (e.g., ['/urlPath'] varies) for /auth FOR DRY
const mutationOptions = (endpointPath, method = 'POST') => ({
  query: (data) => ({
    url: `/${URL_AUTH}/${endpointPath}`,
    method: "POST",
    ...(method === 'POST' && { body: data }) 
  }),
  // Adding transformation and side-effects here
  transformResponse: (response, meta, arg) => {
    console.log("API Raw Response:", response);
    return response;
  },
  onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
    try {
      const { data } = await queryFulfilled;
      console.log("Transformed Data:", data); // Log the transformed data
      dispatch(setUserInfo(data.userInfo)); 
      dispatch(setToken(data.token));       
      localStorage.setItem('token', data.token); 
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
});

export const registerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // MUTATION FOR USER REGISTRATION USING mutationOptions
    register: builder.mutation(mutationOptions('register', 'POST')),

    // MUTATION FOR USER LOGIN USING mutationOptions
    login: builder.mutation(mutationOptions('login', 'POST')),

    // MUTATION FOR USER LOGOUT USING mutationOptions
    logout: builder.mutation(mutationOptions('logout', 'POST')),

    // MUTATION FOR USER LOGOUT USING mutationOptions
    oauth: builder.mutation(mutationOptions('oauth', 'POST')),

  }),
});

// DESTRUCTURING FOR NAMED IMPORTS
export const {   
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useOauthMutation  
} = registerApiSlice;