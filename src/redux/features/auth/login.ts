import { api } from '../../api/apiSlice';
import Cookies from 'js-cookie'; // Import js-cookie library

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signinUser: builder.mutation({
      query: ({ data }) => {
        // Include the Authorization header with the accessToken from cookies
        const accessToken = Cookies.get('refreshToken') || '';

        return {
          url: `/auth/login`,
          method: 'POST',
          body: data,
          headers: {
            Authorization: `${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const { useSigninUserMutation } = userApi;
