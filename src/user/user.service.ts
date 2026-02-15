import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.interface';
import { Model } from 'mongoose';
import { Category } from 'src/category/category.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    @Inject('CATEGORY_MODEL') private categoryModel: Model<Category>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    const generalCategory = new this.categoryModel({ name: 'geral' });
    createdUser.categories.push(generalCategory);
    await generalCategory.save();
    return await createdUser.save();
  }

  async findAll() {
    return await this.userModel
      .find()
      .select({ password: 0 })
      .populate('categories');
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).select({ password: 0 });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto)
      .select({ password: 0 });
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).select({ password: 0 });
  }
}
