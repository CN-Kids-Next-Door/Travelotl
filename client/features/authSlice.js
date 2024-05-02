import { apiSlice } from "./apiSlice.js";
const URL_AUTH = "auth";

// MUTATION OPTIONS (e.g., ['/urlPath'] varies) for /auth FOR DRY
const mutationOptions = (endpointPath, method = 'POST') => ({
  query: (data) => ({
    url: `/${URL_AUTH}/${endpointPath}`,
    method: "POST",
    ...(method === 'POST' && { body: data }) 
  }),
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