import { Connection } from 'mongoose';
import { BookSchema } from './entities/book.entity';

export const booksProviders = [
  {
    provide: 'BOOK_MODEL',
    useFactory: (connection: Connection) => connection.model('Book', BookSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
