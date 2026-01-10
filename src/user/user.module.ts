import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { BookModule } from 'src/book/book.module';
import { BookService } from 'src/book/book.service';
import { booksProviders } from 'src/book/book.providers';

@Module({
  imports: [DatabaseModule, BookModule],
  controllers: [UserController],
  providers: [UserService, BookService, ...userProviders, ...booksProviders],
})
export class UserModule {}
