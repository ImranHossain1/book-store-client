import { IBooks } from '@/types/globalTypes';
import { Link } from 'react-router-dom';

interface IProps {
  book: IBooks;
  index: number;
}

const BookTable = ({ book, index }: IProps) => {
  return (
    <tbody>
      <tr>
        <th>{index}</th>
        <td>
          <b>{book?.title}</b>
        </td>
        <td>{book?.author}</td>
        <td>{book?.genre}</td>
        <td>{book?.publishDate}</td>
        <td>
          <Link to={`/book-details/${book?._id}`}>
            <button className="btn btn-sm bg-blue-800 hover:bg-blue-600 text-white">
              Details
            </button>
          </Link>
        </td>
      </tr>
    </tbody>
  );
};

export default BookTable;
