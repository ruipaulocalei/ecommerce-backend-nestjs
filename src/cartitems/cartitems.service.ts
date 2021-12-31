import { Injectable } from '@nestjs/common';
import { User } from 'generated/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCartItemInput, CreateCartItemOutput } from './dtos/create-cart-item.dto';

@Injectable()
export class CartitemsService {
  constructor(private readonly prisma: PrismaService) { }
  async createCartItem(user: User, { productId }: CreateCartItemInput): Promise<CreateCartItemOutput> {
    try {
      const allCartItems = await this.prisma.cartItem.findMany({
        where: {
          userId: user.id,
          productId
        }
      })
      const [existingItemInCart] = allCartItems
      if (existingItemInCart) {
        // console.log(`Already exists ${existingItemInCart.quantity} increment 1`);
        await this.prisma.cartItem.updateMany({
          where: {
            productId: existingItemInCart.productId
          },
          data: {
            quantity: existingItemInCart.quantity + 1
          }
        })
        return {
          ok: true
        }
      }
      await this.prisma.cartItem.create({
        data: {
          product: {
            connect: {
              id: productId
            }
          },
          user: {
            connect: {
              id: user.id
            }
          }
        }
      })
      return {
        ok: true
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An unexpected error occured'
      }
    }
  }
}
