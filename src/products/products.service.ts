import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductOutput } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }
  async createProduct({ name, image, price, description }: Prisma.ProductCreateInput): Promise<CreateProductOutput> {
    try {
      await this.prisma.product.create({
        data: {
          name,
          image,
          price,
          description
        }
      })
      return {
        ok: true,
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An unexpected error occured'
      }
    }
  }
}
