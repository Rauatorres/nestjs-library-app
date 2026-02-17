import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { Book } from './book.interface';
import { Category } from 'src/category/category.interface';
import { FindManyBooksDto } from './dto/find-many-books.dto';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_MODEL') private bookModel: Model<Book>,
    @Inject('CATEGORY_MODEL') private categoryModel: Model<Category>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    return await new this.bookModel(createBookDto).save();
  }

  async findAll() {
    return await this.bookModel.find();
  }

  async findOneById(id: string) {
    return await this.bookModel.findById(id);
  }

  async findOne(book: Partial<Book>) {
    return await this.bookModel.findOne(book);
  }

  async findMany(data: FindManyBooksDto) {
    return await this.bookModel.find(data);
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return await this.bookModel.findByIdAndUpdate(id, updateBookDto);
  }

  async remove(id: string) {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
