import { Category } from 'src/category/category.interface';

export interface User {
  _id: string;
  name: string;
  password: string;
  categories: Category[];
}
