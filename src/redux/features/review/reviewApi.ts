import { api } from '../../api/apiSlice';
import Cookies from 'js-cookie';
const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postReviews: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/create-review/${id}`,
        method: 'POST',
        body: data,
        // Add the Authorization header with the accessToken from cookies
        headers: {
          Authorization: `${Cookies.get('refreshToken') || ''}`,
        },
      }),
      invalidatesTags: ['reviews'],
    }),
    getReviews: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ['reviews'],
    }),
  }),
});
export const { usePostReviewsMutation, useGetReviewsQuery } = userApi;
