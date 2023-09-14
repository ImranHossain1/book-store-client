import { api } from '../../api/apiSlice';
import Cookies from 'js-cookie';
const planApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postPlanlist: builder.mutation({
      query: (id) => ({
        url: `/plan/${id}`,
        method: 'POST',
        headers: {
          Authorization: `${Cookies.get('refreshToken') || ''}`,
        },
      }),
      invalidatesTags: ['book'],
    }),
    updatePlanlist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/plan/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `${Cookies.get('refreshToken') || ''}`,
        },
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
    deletePlanlist: builder.mutation({
      query: (id) => ({
        url: `/plan/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${Cookies.get('refreshToken') || ''}`,
        },
      }),
      invalidatesTags: ['book'],
    }),
    getPlanlist: builder.query({
      query: () => ({
        url: `/plan`,
        headers: {
          Authorization: `${Cookies.get('refreshToken') || ''}`,
        },
      }),
      providesTags: ['book'],
    }),
  }),
});
export const {
  useGetPlanlistQuery,
  usePostPlanlistMutation,
  useDeletePlanlistMutation,
  useUpdatePlanlistMutation,
} = planApi;
