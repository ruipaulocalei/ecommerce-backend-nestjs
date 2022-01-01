import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrdersService } from './orders.service';

@Module({
  providers: [OrdersService, PrismaService]
})
export class OrdersModule { }
