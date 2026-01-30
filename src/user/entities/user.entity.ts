import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  books: [
    {
      // book: {
      type: {
        title: String,
        categories: [{ name: String }],
      },
      // },
    },
  ],
});
