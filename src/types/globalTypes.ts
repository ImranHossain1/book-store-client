export interface IBooks {
  _id?: number;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

export interface iWishlist {
  _id?: string;
  userEmail: string;
  bookId: string;
  title: string;
  success: boolean;
}

export interface iReadingList {
  _id?: string;
  userEmail: string;
  bookId: string;
  title: string;
  success: boolean;
  readingComplete: boolean;
}
