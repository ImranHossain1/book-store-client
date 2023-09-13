import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['book'],
    }),
    singleBook: builder.query({
      query: (id) => `books/book-details/${id}`,
      providesTags: ['book'],
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
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
