import { api } from '../../api/apiSlice';
const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signInUser: builder.mutation({
      query: ({ data }) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
export const { useSignInUserMutation } = authApi;
