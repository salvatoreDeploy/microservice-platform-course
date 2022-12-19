import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from 'src/services/product.service';
import { AuthorizationGuard } from '../../authorization/authorization.guard';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductService) {}

  @Query(() => [Product])
  //@UseGuards(AuthorizationGuard)
  products() {
    return this.productsService.listAllProducts();
  }

  //@UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
