import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Resolver()
export class TesteResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  hello() {
    return 'Implementado GraphQl';
  }
}
