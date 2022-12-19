import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthUser, CurrentUser } from 'src/http/authorization/current-user';
import { CustomerService } from 'src/services/customer.service';
import { PurchaseService } from 'src/services/purchase.service';
import { AuthorizationGuard } from '../../authorization/authorization.guard';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customerService: CustomerService,
    private purchaseService: PurchaseService,
  ) {}

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchaseService.listAllFromCustomer(customer.id);
  }

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.findCustomerByAuthUserId(user.sub);
  }
}
