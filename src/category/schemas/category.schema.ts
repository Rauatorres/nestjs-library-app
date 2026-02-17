import mongoose from 'mongoose';

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
