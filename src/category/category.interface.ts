// import { Book } from 'src/book/book.interface';

export interface Category {
  _id?: string;
  name: string;
  categories: Category[];
  // books: Book[];
}
