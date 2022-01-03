import { Injectable } from '@nestjs/common';
import { CartItem, User } from 'generated/client';
import { PrismaService } from 'src/prisma.service';
import { CartItemInput, CartItemOutput } from './dtos/cart-item.dto';

@Injectable()
export class CartitemsService {
  constructor(private readonly prisma: PrismaService) { }

  async createCartItem(user: User, { productId }: CartItemInput): Promise<CartItemOutput> {
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
            productId: existingItemInCart.productId,
            userId: user.id
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

  async decrementQuantityInProductCart(user: User, { productId }: CartItemInput): Promise<CartItemOutput> {
    try {
      const productInCart = await this.prisma.cartItem.findFirst({
        where: {
          userId: user.id,
          productId
        }
      })
      if (!productInCart) {
        return {
          ok: false,
          error: 'This product doesn\'t exist'
        }
      }
      if (productInCart.quantity > 1) {
        await this.prisma.cartItem.updateMany({
          where: {
            productId: productInCart.productId,
            userId: user.id
          },
          data: {
            quantity: productInCart.quantity - 1
          }
        })
        return {
          ok: true
        }
      } else {
        await this.prisma.cartItem.deleteMany({
          where: {
            productId: productInCart.productId,
            userId: user.id
          }
        })
        return {
          ok: true
        }
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An unexpected error occured'
      }
    }
  }

  async getCartItems(user: User): Promise<CartItem[]> {
    try {
      return await this.prisma.cartItem.findMany({
        where: {
          userId: user.id
        },
        include: {
          product: true,
          user: true,
        }
      })
    } catch (error) {
    }
  }

  formatMoney(amount: number) {
    const formatter = Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      maximumFractionDigits: 2
    })
    return formatter.format(amount)
  }

  async itemsInCart(user: User, cartItem: CartItem) {
    try {
      const items = await this.prisma.cartItem.findMany({
        where: {
          userId: user.id,
          id: cartItem.id
        },
        include: {
          product: true
        }
      })
      return items
    } catch (error) {
    }
  }
  async subTotalFormatted(user: User, cartItem: CartItem) {
    try {
      const items = await this.itemsInCart(user, cartItem)
      let finalTotal = 0
      let subTotatlFormatted = ''
      items.forEach(item => {
        finalTotal = item.quantity * +item.product.price
        subTotatlFormatted = `${item.quantity} x ${this.formatMoney(+item.product.price)} = ${this.formatMoney(finalTotal)}`
      })
      // console.log(`Total = ${finalTotal += finalTotal}`)
      // finalTotal = items.reduce((newItem, product) => newItem += +product.product.price * product.quantity, 0)
      return subTotatlFormatted
    } catch (error) {
      return 0
    }
  }

  async subTotal(user: User, cartItem: CartItem): Promise<number> {
    try {
      const items = await this.itemsInCart(user, cartItem)
      let finalTotal = 0
      items.forEach(item => {
        finalTotal = item.quantity * +item.product.price
        // console.log(`${item.quantity} x ${this.formatMoney(+item.product.price)} = ${this.formatMoney(finalTotal)}`);
      })
      // console.log(`Total = ${finalTotal += finalTotal}`)
      // finalTotal = items.reduce((newItem, product) => newItem += +product.product.price * product.quantity, 0)
      return finalTotal
    } catch (error) {
      return 0
    }
  }
}
