import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { KafkaService } from 'src/messaging/kafka.service';

interface CreatePurchaseData {
  productId: string;
  customerId: string;
}

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listAllFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ customerId, productId }: CreatePurchaseData) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!productExists) {
      throw new Error('Product not exists');
    }

    await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });
  }
}
