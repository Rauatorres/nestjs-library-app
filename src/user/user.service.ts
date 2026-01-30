import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { createHash } from 'node:crypto';
import { BookService } from 'src/book/book.service';
import { Book } from 'src/book/book.interface';
// import { UserBookDTO } from './dto/user-book.dto';
import { EditBookDTO } from './dto/edit-book.dto';
import { CreateBookDTO } from './dto/create-book.dto';
import { DeleteBookDTO } from './dto/delete-book.dto';

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
      };
    } else {
      throw new Error('nome de usuário ou senha incorretos');
    }
  }

  async findOneById(id: string) {
    const res = await this.userModel.findById<User>(id).exec();
    if (res != null) {
      return {
        name: res.name,
        books: res.books,
      };
    } else {
      throw new Error('nome de usuário ou senha incorretos');
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async addBook(userId: string, createBookDto: CreateBookDTO) {
    const user = await this.userModel.findOne({ _id: userId });
    const book: Book = { title: createBookDto.title, categories: [] };
    if (user != undefined) {
      user.books.push(book);
      return user.save();
    } else {
      throw new Error('usuário não encontrado');
    }
  }

  async removeBook(userId: string, deleteBookDto: DeleteBookDTO) {
    const user = await this.userModel.findOne({ _id: userId });

    if (user != undefined) {
      const deletedBook = user.books.find(
        (book) => book._id == deleteBookDto.bookId,
      );
      if (deletedBook != undefined) {
        user.books.splice(user.books.indexOf(deletedBook), 1);
        return user.save();
      } else {
        throw new Error('livro não encontrado');
      }
    } else {
      throw new Error('usuário não encontrado');
    }
  }

  async editBook(userId: string, editBookDto: EditBookDTO) {
    const user = await this.userModel.findOne({ _id: userId });
    if (user != undefined) {
      const editedBook = user.books.find(
        (book) => book._id == editBookDto.bookId,
      );
      if (editedBook != undefined) {
        user.books.splice(user.books.indexOf(editedBook), 1, {
          ...editedBook,
          title: editBookDto.title,
        });
        return user.save();
      } else {
        throw new Error('livro não encontrado');
      }
    } else {
      throw new Error('usuário não encontrado');
    }
  }
}
