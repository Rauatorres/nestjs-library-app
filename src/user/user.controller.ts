// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { UserBookDTO } from './dto/user-book.dto';
import { EditBookDTO } from './dto/edit-book.dto';
import { CreateBookDTO } from './dto/create-book.dto';
import { DeleteBookDTO } from './dto/delete-book.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id/add/book')
  async addBook(@Param('id') id: string, @Body() addBookDto: CreateBookDTO) {
    return await this.userService.addBook(id, addBookDto);
  }

  @Patch(':id/remove/book')
  async removeBook(
    @Param('id') id: string,
    @Body() deleteBookDto: DeleteBookDTO,
  ) {
    return await this.userService.removeBook(id, deleteBookDto);
  }

  @Patch(':id/edit/book')
  async editBook(@Param('id') id: string, @Body() editBookDto: EditBookDTO) {
    return await this.userService.editBook(id, editBookDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.userService.findOneById(id);
    return res;
  }

  @Post('login')
  login(@Body() userDto: UserDto) {
    return this.userService.login(userDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
