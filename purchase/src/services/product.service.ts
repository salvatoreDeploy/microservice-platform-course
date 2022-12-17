import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateProductData {
  title: string;
}

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  async createProduct({ title }: CreateProductData) {
    const slug = slugify(title, { lower: true });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (productWithSameSlug) {
      throw new Error('Another product with same slug already exists');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
