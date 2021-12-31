import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }
  async createProduct({ name, image, price, description }: Prisma.ProductCreateInput) {
    try {
      await this.prisma.product.create({
        data: {
          name,
          image,
          price,
          description
        }
      })
    } catch (error) {

    }
  }
}
