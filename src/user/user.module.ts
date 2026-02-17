import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryModule } from 'src/category/category.module';
import { categoryProviders } from 'src/category/category.providers';
import { BookModule } from 'src/book/book.module';
import { bookProviders } from 'src/book/book.providers';
import { BookService } from 'src/book/book.service';

@Module({
  imports: [DatabaseModule, CategoryModule, BookModule],
  controllers: [UserController],
  providers: [
    UserService,
    BookService,
    ...userProviders,
    ...categoryProviders,
    ...bookProviders,
  ],
})
export class UserModule {}
