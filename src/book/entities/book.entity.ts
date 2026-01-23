import mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  name: String,
  categories: [],
});
