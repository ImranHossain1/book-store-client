import { api } from '@/redux/api/apiSlice';

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
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/create-review/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  usePostBookMutation,
  useGetCommentQuery,
  usePostCommentMutation,
} = bookApi;
