import { Field, ID, ObjectType } from '@nestjs/graphql';

//Model - DTO

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;
  @Field()
  title: string;
  @Field()
  slug: string;
}
