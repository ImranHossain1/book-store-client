import { api } from '../../api/apiSlice';
const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: ({ data }) => ({
        url: `/users/signup`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
export const { useSignupUserMutation } = userApi;
