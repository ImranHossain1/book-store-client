import BookTable from '@/components/BookTable';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { IBooks } from '@/types/globalTypes';

const Books = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }
  console.log(data.data);
  const books = data?.data;
  return (
    <div className="">
      <div className="mt-10 w-full">
        <div className="mb-8">
          <h2 className="text-3xl text-center font-bold text-blue-800">
            My Book Store
          </h2>
        </div>
        <div className="w-full px-4 md:flex md:justify-between items-center">
          <div className="p-2 md:p-0 md:w-4/12">
            <input
              type="text"
              placeholder="Search By Name Or Author Or Genre"
              className="input input-bordered input-secondary w-full"
            />
          </div>
          <div className="md:flex items-center">
            <div className="p-2">
              <select className="select select-secondary w-full">
                <option disabled value="">
                  Any Publication Year
                </option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
              </select>
            </div>
            <div className="p-2">
              <div className="p-2">
                <select className="select select-secondary w-full">
                  <option disabled value="">
                    All Genres
                  </option>
                  <option value="Fiction">Fiction</option>
                  <option value="History">History</option>
                  <option value="Science">Science</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Poem">Poem</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto my-6 mx-2">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Publication Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              {books?.map((book: IBooks, index: number) => (
                <BookTable
                  book={book}
                  key={index}
                  index={index + 1}
                ></BookTable>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
