import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductService } from 'src/services/product.service';
import { PurchaseService } from 'src/services/purchase.service';
import { AuthorizationGuard } from '../../authorization/authorization.guard';
import { Product } from '../models/product';

import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService,
  ) {}

  @Query(() => [Purchase])
  //@UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchaseService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productService.findProductById(purchase.productId);
  }
}
