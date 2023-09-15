import { api } from '@/redux/api/apiSlice';
import Cookies from 'js-cookie';
type IBookSort = {
  page: number;
  limit: number;
  sortOrder: string;
  searchTerm: string;
};
const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (options: IBookSort) =>
        `/books?page=${options.page}&limit=${options.limit}&sortOrder=${options.sortOrder}&searchTerm=${options.searchTerm}`,
      providesTags: ['book'],
    }),
    singleBook: builder.query({
      query: (id) => `books/book-details/${id}`,
      providesTags: ['book'],
    }),
    postBook: builder.mutation({
      query: ({ data }) => ({
        url: `/books/create-book`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/update_book/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['book'],
    }),
    postWishlist: builder.mutation({
      query: (id) => ({
        url: `/wish/create-wish/${id}`,
        method: 'POST',
        headers: {
          Authorization: `${Cookies.get('refreshToken') || ''}`,
        },
      }),
      invalidatesTags: ['book'],
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/wish/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${Cookies.get('refreshToken') || ''}`,
        },
      }),
      invalidatesTags: ['book'],
    }),
    getWishlist: builder.query({
      query: () => ({
        url: `/wish`,
        headers: {
          Authorization: `${Cookies.get('refreshToken') || ''}`,
        },
      }),
      providesTags: ['book'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  usePostBookMutation,
  usePostWishlistMutation,
  useGetWishlistQuery,
  useDeleteWishlistMutation,
} = bookApi;
