import { Book } from 'src/book/book.interface';

export interface Category {
  name: string;
  categories: Category[];
  books: Book[];
}
