import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsService, PrismaService, ProductsResolver, UsersService],
  // imports: [UsersService]
})
export class ProductsModule { }
