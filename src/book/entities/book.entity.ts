import mongoose from "mongoose";

export const BookSchema = new mongoose.Schema({
    title: String,
    categories: [],
});
