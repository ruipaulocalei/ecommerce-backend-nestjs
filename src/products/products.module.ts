import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsService, PrismaService]
})
export class ProductsModule { }
