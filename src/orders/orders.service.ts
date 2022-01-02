import { Injectable } from '@nestjs/common';
import { Order, User } from 'generated/client';
import { OutputDto } from 'src/common/dtos/output.dto';
import { OrderModel } from 'src/models/orders.model';
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
      const i = items.map(item => {
        const orderItem = {
          quantity: item.quantity,
          products: { connect: { id: item.product.id } },
        }
        return orderItem
      })
      if (i.length === 0 || total === 0) {
        return {
          ok: false,
          error: 'You need have product in cart to create an order',
        }
      }
      await this.prisma.order.create({
        data: {
          total,
          items: { create: i },
          user: {
            connect: {
              id: userInDb.id
            }
          }
        }
      })
      // const itemIds = items.map(item => item.id)
      await this.prisma.cartItem.deleteMany({
        where: {
          user: {
            id: userInDb.id
          }
        }
      })
      return {
        ok: true
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An error occured. Try again!..' + error
      }
    }
  }

  async getOrders(user: User): Promise<Order[]> {
    let orders: Order[]
    orders = await this.prisma.order.findMany({
      where: {
        userId: user.id
      },
      include: {
        items: {
          include: {
            products: true
          }
        },
        user: true
      }
    })
    return orders
  }
}
