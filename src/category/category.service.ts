import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { HydratedDocument, Model } from 'mongoose';
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

  async tree(topParentCategoryId: string) {
    const topParentCategory =
      await this.categoryModel.findById(topParentCategoryId);

    type CategoryQueryResult = HydratedDocument<Category> | null | Category;

    let layersQuantity: number = 0;
    let currentLayerNestedCategories: CategoryQueryResult[] = [
      topParentCategory,
    ];

    while (currentLayerNestedCategories.length > 0) {
      const newNestedCategoriesLayer: CategoryQueryResult[] = [];

      for (const nestedCategory of currentLayerNestedCategories) {
        const category = await this.categoryModel.findById(nestedCategory!._id);

        if (category!.categories.length > 0) {
          category!.categories.forEach((subCategory) => {
            newNestedCategoriesLayer.push(subCategory);
          });
        }
      }

      currentLayerNestedCategories = newNestedCategoriesLayer;
      layersQuantity++;
    }

    type FlexibleObject = {
      path: string;
      populate?: FlexibleObject;
      options?: { strictPopulate: boolean };
    };

    const iterationList: FlexibleObject[] = [{ path: 'categories' }];

    for (let count = 1; count <= layersQuantity; count++) {
      iterationList.push({ ...iterationList[count - 1] });
      iterationList[count]['populate'] = { path: 'categories' };
    }

    for (let index = layersQuantity - 1; index > 0; index--) {
      iterationList[index - 1].populate = {
        path: 'categories',
        populate: iterationList[index].populate,
        options: { strictPopulate: false },
      };
    }

    const nestedCategoriesObject = await topParentCategory!.populate(
      iterationList[0],
    );

    return nestedCategoriesObject;
  }
}
