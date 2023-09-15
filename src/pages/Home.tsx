import Banner from '@/components/Banner';
import BookCard from '@/components/BookCard';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { IBooks } from '@/types/globalTypes';

const Home = () => {
  const options = {
    limit: 9,
    sortOrder: 'desc'
  };
  const { data: books, isLoading } = useGetBooksQuery(options);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <Banner></Banner>
      {
        <div className="col-span-9 grid grid-cols-1 md:grid-cols-3 gap-10 pb-20 mx-5 md:mx-20">
          {books?.data?.map((book: IBooks) => (
            <BookCard book={book} key={book._id} />
          ))}
        </div>
      }
    </div>
  );
};

export default Home;
