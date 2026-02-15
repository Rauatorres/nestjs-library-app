import mongoose from 'mongoose';
import { CategorySchema } from 'src/category/schemas/category.schema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const categoryModule = mongoose.model('Category', CategorySchema);

export const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
  ],
});
