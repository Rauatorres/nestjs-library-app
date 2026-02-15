import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { bookProviders } from './book.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryModule } from 'src/category/category.module';
import { categoryProviders } from 'src/category/category.providers';

@Module({
  imports: [DatabaseModule, CategoryModule],
  controllers: [BookController],
  providers: [BookService, ...bookProviders, ...categoryProviders],
})
export class BookModule {}
