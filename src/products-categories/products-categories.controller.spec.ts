import { Test, TestingModule } from '@nestjs/testing';
import { ProductsCategoriesController } from './products-categories.controller';

describe('ProductsCategoriesController', () => {
  let controller: ProductsCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsCategoriesController],
    }).compile();

    controller = module.get<ProductsCategoriesController>(ProductsCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
