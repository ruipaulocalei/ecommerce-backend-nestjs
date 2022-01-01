import { Injectable } from '@nestjs/common';
import { Prisma, Product } from 'generated/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductOutput } from './dtos/create-product.dto';
import { GetProductOutput } from './dtos/get-product.dto';
import { SearchProductOutput } from './dtos/search-product.dto';

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

  async getProducts(): Promise<Product[]> {
    try {
      return await this.prisma.product.findMany()
    } catch (error) {
    }
  }

  async getProduct({ id }: Prisma.ProductWhereUniqueInput): Promise<GetProductOutput> {
    try {
      return await this.findProductById({ id })
    } catch (error) {
    }
  }

  async search({ name }: Prisma.ProductWhereInput): Promise<SearchProductOutput> {
    try {
      // const product = await this.findProductByName({name})
      const products = await this.prisma.product.findMany({
        where: {
          name: {
            contains: name.toString(),
          },
        },

      })
      if (products.length === 0) {
        return {
          ok: false,
          error: 'This product doesn\'t exist'
        }
      }
      return {
        ok: true,
        products
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An unexpected error occured'
      }
    }
  }

  async findProductByName({ name }: Prisma.ProductWhereInput): Promise<GetProductOutput> {
    try {
      const product = await this.prisma.product.findFirst({
        where: {
          name
        }
      })
      if (!product) {
        return {
          ok: false,
          error: 'This product doesn\'t exist'
        }
      }
      return {
        ok: true,
        product
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An unexpected error occured'
      }
    }
  }

  async findProductById({ id }: Prisma.ProductWhereUniqueInput): Promise<GetProductOutput> {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id
        }
      })
      if (!product) {
        return {
          ok: false,
          error: 'This product doesn\'t exist'
        }
      }
      return {
        ok: true,
        product
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An unexpected error occured'
      }
    }
  }
}
