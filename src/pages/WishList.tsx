import React, { useEffect, useState } from 'react';
import {
  useDeleteWishlistMutation,
  useGetWishlistQuery,
} from '@/redux/features/books/bookApi';
import toast from 'react-hot-toast';
import { WishlistItem } from '@/types/globalTypes';

const WishList = () => {
  const { data: wish, isLoading: fetchLoading } = useGetWishlistQuery({});
  const [deleteWish, { isSuccess, isLoading }] = useDeleteWishlistMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>('');

  useEffect(() => {
    if (isSuccess === true) {
      toast.success('Delete from Watch List!');
    }
  }, [isSuccess]);
  const handleRemoveFromWishlist = async (itemId: string) => {
    deleteWish(itemId);
    closeModal();
  };

  const openModal = (itemId: string) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemId('');
  };

  if (isLoading || fetchLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mt-10 w-full">
        <div className="mb-8">
          <h2 className="text-3xl text-center font-bold text-blue-800">
            My Book Store
          </h2>
        </div>

        <div>
          <div className="overflow-x-auto my-6 mx-2">
            <table className="table">
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
              <tbody>
                {wish?.data?.map(
                  (wishlistItem: WishlistItem, index: number) => (
                    <tr key={wishlistItem?._id}>
                      <td>{index + 1}</td>
                      <td>{wishlistItem?.book?.title}</td>
                      <td>{wishlistItem?.book?.author}</td>
                      <td>{wishlistItem?.book?.genre}</td>
                      <td>{wishlistItem?.book?.publicationDate}</td>
                      <td>
                        <button
                          onClick={() => openModal(wishlistItem?._id)}
                          className="btn bg-red-900 font-bold hover:bg-red-700 text-white ml-2"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <p className="modal-title">Confirm Removal</p>
              <p>
                Are you sure you want to remove this book from your wishlist?
              </p>
              <div className="modal-action">
                <button onClick={closeModal} className="btn btn-secondary">
                  Cancel
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(selectedItemId)}
                  className="btn bg-red-900 font-bold hover:bg-red-700 text-white ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
