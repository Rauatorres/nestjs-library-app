import mongoose from 'mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
// import { CategorySchema } from 'src/category/schemas/category.schema';

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const categoryModel = mongoose.model('Category', CategorySchema);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userModel = mongoose.model('User', UserSchema);

export const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  description: { type: String },
  file: { type: String },
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
});
