import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryModule } from 'src/category/category.module';
import { categoryProviders } from 'src/category/category.providers';

@Module({
  imports: [DatabaseModule, CategoryModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders, ...categoryProviders],
})
export class UserModule {}
