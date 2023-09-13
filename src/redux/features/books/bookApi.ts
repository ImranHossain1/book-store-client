import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    singleBook: builder.query({
      query: (id) => `books/book-details/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useSingleBookQuery } = bookApi;
