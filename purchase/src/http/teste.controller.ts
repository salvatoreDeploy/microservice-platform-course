import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from './authorization/authorization.guard';

@Controller()
export class TesteController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UseGuards(AuthorizationGuard)
  hello() {
    return this.prisma.customer.findMany();
  }
}
