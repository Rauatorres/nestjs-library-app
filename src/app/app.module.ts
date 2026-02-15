import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { BookModule } from 'src/book/book.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    BookModule,
    CategoryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
