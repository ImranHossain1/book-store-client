import { usePostBookMutation } from '@/redux/features/books/bookApi';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddNewBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
  });

  const [book, { isSuccess, isLoading }] = usePostBookMutation();
  const handleAddBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, author, genre, publicationDate } = formData;
    const options = {
      data: { title, author, genre, publicationDate },
    };
    //console.log(publicationDate);
    book(options);
  };

  useEffect(() => {
    if (isSuccess === true) {
      toast.success('Book Added Successfully!');
      // Reset the input fields
      setFormData({
        title: '',
        author: '',
        genre: '',
        publicationDate: '',
      });
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-full md:my-12 my-8">
      <form
        onSubmit={handleAddBook}
        className="w-10/12 md:w-4/12 mx-auto border p-3 md:p-8"
      >
        <h2 className="text-2xl text-center font-bold text-blue-800">
          Add A New Book
        </h2>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Title</span>
          </label>
          <input
            name="title"
            type="text"
            onChange={handleInputChange}
            placeholder="Enter Title"
            className="input input-bordered w-full"
            value={formData.title}
          />
        </div>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Author</span>
          </label>
          <input
            name="author"
            type="text"
            onChange={handleInputChange}
            placeholder="Enter Author"
            className="input input-bordered w-full"
            value={formData.author}
          />
        </div>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Genre</span>
          </label>
          <input
            name="genre"
            type="text"
            onChange={handleInputChange}
            placeholder="Enter Genre"
            className="input input-bordered w-full"
            value={formData.genre}
          />
        </div>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Publish Date</span>
          </label>
          <input
            name="publicationDate"
            type="date"
            onChange={handleInputChange}
            placeholder="Enter Publish Date"
            className="input input-bordered w-full"
            value={formData.publicationDate}
          />
        </div>
        <div className="form-control w-full mt-6">
          <button className="btn btn-active bg-blue-800 hover:bg-blue-600 text-white">
            Add Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBook;
