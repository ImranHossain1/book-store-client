import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hook';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useSingleBookQuery(id);
  const [updateBook] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    title: book?.data?.title || '',
    author: book?.data?.author || '',
    genre: book?.data?.genre || '',
    publicationDate: book?.data?.publicationDate || '',
  });

  const handleUpdateBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);
    const { title, author, genre, publicationDate } = formData;

    const options = {
      id,
      data: { title, author, genre, publicationDate },
    };
    //console.log(options);
    updateBook(options)
      .unwrap() // Unwrap the mutation result
      .then(() => {
        toast.success('Book Updated Successfully!');
        navigate('/books');
      })
      .catch((error) => {
        console.error('Error updating book:', error);
      });
  };

  const handleInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full md:my-12 my-8">
      <form
        onSubmit={handleUpdateBook}
        className="w-10/12 md:w-4/12 mx-auto border p-3 md:p-8"
      >
        <h2 className="text-2xl text-center font-bold text-red-800">
          Edit This Book
        </h2>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Title</span>
          </label>
          <input
            name="title"
            type="text"
            defaultValue={book?.data?.title}
            onBlur={handleInputBlur}
            placeholder="Enter Title"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Author</span>
          </label>
          <input
            name="author"
            type="text"
            defaultValue={book?.data?.author}
            onBlur={handleInputBlur}
            placeholder="Enter Author"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Genre</span>
          </label>
          <input
            name="genre"
            type="text"
            defaultValue={book?.data?.genre}
            onBlur={handleInputBlur}
            placeholder="Enter Genre"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Publish Date</span>
          </label>
          <input
            name="publicationDate"
            type="text"
            defaultValue={book?.data?.publicationDate}
            onBlur={handleInputBlur}
            placeholder="Enter Publish Date"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full mt-6">
          <button className="btn btn-active bg-red-800 hover:bg-red-600 text-white">
            Add The Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
