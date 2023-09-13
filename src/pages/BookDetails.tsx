import { useSingleBookQuery } from '@/redux/features/books/bookApi';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const { data: book, isLoading } = useSingleBookQuery(id);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }
  return (
    <div className="my-12 md:w-4/12 mx-auto">
      <h2 className="text-red-600 text-center text-3xl font-bold mb-12">
        Details Of {book?.data.title}
      </h2>
      <div className="card glass">
        <div className="card-body">
          <h2 className="card-title">{book?.data?.title}</h2>
          <p>Author : {book?.data?.author}</p>
          <p>Genre : {book?.data?.genre}</p>
          <p>Publication Date : {book?.data?.publicationDate}</p>

          <div className="card-actions justify-start mt-4">
            <Link
              to={'/update-book/'}
              className="btn bg-red-900 font-bold hover:bg-red-700  btn-sm text-white"
            >
              Edit
            </Link>
            <button className="btn bg-red-900  font-bold hover:bg-red-700 btn-sm text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
