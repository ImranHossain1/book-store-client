import BookTable from '@/components/BookTable';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { IBooks } from '@/types/globalTypes';
import { SetStateAction, useState } from 'react';

const Books = () => {
  const [page, setPage] = useState(1); // Default page number
  const [limit, setLimit] = useState(10); // Default limit
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order
  const [searchTerm, setSearchTerm] = useState(''); // Default sorting order

  const options = {
    page,
    limit,
    sortOrder,
    searchTerm,
  };
  const { data, isLoading, error } = useGetBooksQuery(options);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

  const handleSortOrderChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
  };
  const handleSearchTermChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };
  console.log(data);
  const total = Math.ceil(data.meta.total / data.meta.limit);

  // Create an array of numbers from 1 to total
  const pageNumbers = Array.from({ length: total }, (_, index) => index + 1);

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
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <div className="md:flex items-center">
            <div className="p-2">
              <div className="p-2">
                {/* Limit selection */}
                <select
                  className="select select-secondary w-full"
                  value={limit}
                  onChange={(e) => handleLimitChange(parseInt(e.target.value))}
                >
                  <option value="10">10 per page</option>
                  <option value="20">20 per page</option>
                  <option value="50">50 per page</option>
                </select>
              </div>
            </div>
            <div className="p-2">
              <div className="p-2">
                {/* Sort order selection */}
                <select
                  className="select select-secondary w-full"
                  value={sortOrder}
                  onChange={(e) => handleSortOrderChange(e.target.value)}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
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
            {/* Pagination controls */}
            <div className="flex justify-center mt-5 space-x-4">
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  className="join-item btn"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
