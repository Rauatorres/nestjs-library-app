import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { createHash } from 'node:crypto';
import { BookService } from 'src/book/book.service';
import { Book } from 'src/book/book.interface';
import { UserBookDTO } from './dto/user-book.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    private readonly bookService: BookService,
  ) {}

  create(createUserDto: UserDto) {
    const createdUser = new this.userModel(createUserDto);
    const encriptedPassword = createHash('sha256')
      .update(createdUser.password)
      .digest('hex');
    createdUser.password = encriptedPassword;
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  async login(user: UserDto) {
    user.password = createHash('sha256').update(user.password).digest('hex');
    const res = await this.userModel.findOne<User>(user).exec();
    if (res != null) {
      return {
        id: res._id,
        name: res.name,
        books: res.books,
      };
    } else {
      throw new Error('nome de usuário ou senha incorretos');
    }
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

  async addBook(userBookDto: UserBookDTO) {
    const { userId, bookId } = userBookDto;
    const book: Book | null = await this.bookService.findOne(bookId);
    const user = await this.userModel.findOne({ _id: userId });
    const updatedUser = new this.userModel(user);

    for (const bookElement of user!.books) {
      if (bookElement._id?.toString() == book!._id?.toString()) {
        throw new Error('o livro já está na lista do usuário!');
      }
    }

    updatedUser.books.push(book!);
    return await updatedUser.save();
  }

  async removeBook(userBookDto: UserBookDTO) {
    const { userId, bookId } = userBookDto;
    const book: Book | null = await this.bookService.findOne(bookId);
    const user = await this.userModel.findOne({ _id: userId });
    const updatedUser = new this.userModel(user);

    updatedUser.books.splice(updatedUser.books.indexOf(book!), 1);
    return await updatedUser.save();
  }
}
