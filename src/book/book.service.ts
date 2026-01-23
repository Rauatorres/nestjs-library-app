import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { Book } from './book.interface';
import CategoryDto from './dto/category.dto';

@Injectable()
export class BookService {
  constructor(@Inject('BOOK_MODEL') private bookModel: Model<Book>) {}

  create(createBookDto: CreateBookDto) {
    const newBook = new this.bookModel(createBookDto);
    console.log(createBookDto);
    return newBook.save();
  }

  findAll() {
    return this.bookModel.find();
  }

  findOne(id: string) {
    return this.bookModel.findById(id);
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto);
  }

  remove(id: string) {
    return this.bookModel.findByIdAndDelete(id);
  }

  async addCategory(addCategoryDto: CategoryDto) {
    const book = await this.bookModel.findById(addCategoryDto.bookId);
    const newBook = new this.bookModel(book);

    for (const category of newBook.categories) {
      if (category == addCategoryDto.name) {
        throw new Error('já existe uma categoria com esse nome no livro');
      }
    }

    newBook.categories.push(addCategoryDto.name);
    return await newBook.save();
  }

  async removeCategory(removeCategoryDto: CategoryDto) {
    const book = await this.bookModel.findById(removeCategoryDto.bookId);
    const newBook = new this.bookModel(book);

    for (const category of newBook.categories) {
      if (category == removeCategoryDto.name) {
        newBook.categories.splice(newBook.categories.indexOf(category), 1);
      }
    }

    return await newBook.save();
  }
}
