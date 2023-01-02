import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';

import path from 'node:path';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductService } from 'src/services/product.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchaseService } from 'src/services/purchase.service';
import { CustomerService } from 'src/services/customer.service';
import { CustomerResolver } from './graphql/resolvers/customer.resolver';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    ProductsResolver,
    ProductService,
    PurchasesResolver,
    PurchaseService,
    CustomerService,
    CustomerResolver,
  ],
})
export class HttpModule {}
