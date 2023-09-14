export interface IBooks {
  _id?: number;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

export interface WishlistItem {
  _id: string;
  book: {
    _id: string;
    title: string;
    genre: string;
    publicationDate: string;
    author: string;
  };
}
export interface PlanlistItem {
  _id: string;
  book: {
    _id: string;
    title: string;
    genre: string;
    publicationDate: string;
    author: string;
  };
  complete: boolean;
}

export interface iReadingList {
  _id?: string;
  userEmail: string;
  bookId: string;
  title: string;
  success: boolean;
  readingComplete: boolean;
}
