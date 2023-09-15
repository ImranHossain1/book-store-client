import { IBooks } from '@/types/globalTypes';
import { Link } from 'react-router-dom';

interface IProps {
  book: IBooks;
}

export default function BookCard({ book }: IProps) {
  return (
    <div>
      <Link to={`/book-details/${book._id}`} className="w-full">
        <div className="rounded-2xl flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
          <h1 className="text-xl font-semibold">{book?.title}</h1>
          <p>Author: ${book.author} </p>
          <p className="text-sm">Genre: ${book.genre}</p>
          <p className="text-sm">Publication Date: ${book.publicationDate}</p>
        </div>
      </Link>
    </div>
  );
}
