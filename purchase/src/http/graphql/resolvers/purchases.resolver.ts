import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthUser, CurrentUser } from 'src/http/authorization/current-user';
import { CustomerService } from 'src/services/customer.service';
import { ProductService } from 'src/services/product.service';
import { PurchaseService } from 'src/services/purchase.service';
import { AuthorizationGuard } from '../../authorization/authorization.guard';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';

import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private customerService: CustomerService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchaseService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productService.findProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customerService.findCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customerService.createCostumerId({
        authUserId: user.sub,
      });
    }

    return this.purchaseService.createPurchase({
      customerId: customer.id,
      productId: data.productId,
    });
  }
}
