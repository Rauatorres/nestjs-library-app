import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { createHash } from 'node:crypto';
import { BookService } from 'src/book/book.service';
import { Book } from 'src/book/book.interface';
import { UserBookDTO } from './dto/user-book.dto';
import { error } from 'node:console';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>, private readonly bookService: BookService){}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    const encriptedPassword = createHash('sha256').update(createdUser.password).digest('hex');
    createdUser.password = encriptedPassword;
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async addBook(userBookDto: UserBookDTO){
    const { userId, bookId } = userBookDto;
    const book: Book | null = await this.bookService.findOne(bookId);
    const user = await this.userModel.findOne({ _id: userId });
    const updatedUser = new this.userModel(user);

    for(let bookElement of user!.books){
      if (bookElement._id?.toString() == book!._id?.toString()){
        throw new Error("o livro já está na lista do usuário!");
      }
    }

    updatedUser.books.push(book!);
    return await updatedUser.save();
  }

  async removeBook(userBookDto: UserBookDTO){
    const { userId, bookId } = userBookDto;
    const book: Book | null = await this.bookService.findOne(bookId);
    const user = await this.userModel.findOne({ _id: userId });
    const updatedUser = new this.userModel(user);

    updatedUser.books.splice(updatedUser.books.indexOf(book!), 1);
    return await updatedUser.save();
  }
}
