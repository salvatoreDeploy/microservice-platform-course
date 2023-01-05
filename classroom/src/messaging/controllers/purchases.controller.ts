import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

export interface ICustomer {
  authUserId: string;
}

export interface IProduct {
  id: string;
  title: string;
  slug: string;
}

export interface IPayloadPurchase {
  customer: ICustomer;
  product: IProduct;
}

@Controller()
export class PurchaseController {
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload() payload: IPayloadPurchase) {
    console.log(payload);
  }
}
