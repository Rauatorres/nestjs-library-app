import mongoose from 'mongoose';
import { BookSchema } from 'src/book/schemas/book.schema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bookModule = mongoose.model('Book', BookSchema);

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const categoryModule = mongoose.model('Category', CategorySchema);

export { CategorySchema };
