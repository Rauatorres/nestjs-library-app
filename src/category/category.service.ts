import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { Category } from './category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_MODEL') private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const parentCategory = await this.categoryModel.findById(
      createCategoryDto.parentId,
    );

    if (parentCategory) {
      const newCategory = new this.categoryModel({
        name: createCategoryDto.name,
      });

      parentCategory.categories.push(newCategory);

      await newCategory.save();
      await parentCategory.save();
      return parentCategory.categories;
    } else {
      throw new Error('categoria pai não encontrada');
    }
    // return await new this.categoryModel(createCategoryDto).save();
  }

  async findAll() {
    return await this.categoryModel.find();
  }

  async findOne(id: string) {
    return await this.categoryModel.findById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  async remove(id: string) {
    return await this.categoryModel.findByIdAndDelete(id);
  }
}
