import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from './product';

//Model - DTO

enum PurchaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Available purcahse statuses',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;
  @Field(() => PurchaseStatus)
  status: PurchaseStatus;
  @Field()
  createdAt: string;
  @Field(() => Product)
  product: Product;

  productId: string;
}
