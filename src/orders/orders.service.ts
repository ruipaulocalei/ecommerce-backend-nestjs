import { Injectable } from '@nestjs/common';
import { User } from 'generated/client';
import { OutputDto } from 'src/common/dtos/output.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) { }
  async createOrder(user: User): Promise<OutputDto> {
    try {
      if (!user) {
        return {
          ok: false,
          error: 'Do Login to create an order!.'
        }
      }

      const userInDb = await this.prisma.user.findUnique({
        where: {
          id: user.id
        },
        include: {
          cartItem: {
            include: {
              product: true
            }
          }
        }
      })
      const items = userInDb.cartItem.filter(item => item.product)
      const total = items.reduce((newItem, product) => newItem += +product.product.price * product.quantity, 0)
      console.log(total)
      items.map(item => {
        const orderItem = {
          // user: { connect: { id: userInDb.id } },
          product: { connect: { id: item.productId } },
        }
        console.log(orderItem)
        return orderItem
      })
      await this.prisma.order.create({
        data: {
          total,
          items: {
            create: items
          },
          user: {
            connect: {
              id: userInDb.id
            }
          }
        }
      })
      // const itemIds = items.map(item => item.id)
      // await this.prisma.cartItem.deleteMany({
      //   where: {
      //     id: itemIds
      // })
      return {
        ok: true
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An error occured. Try again!..'
      }
    }
  }
}
