import { Book } from 'src/book/book.interface';

export interface User {
  _id?: string;
  name: string;
  password: string;
  books: Book[];
}
