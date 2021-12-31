import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CartItemResolver } from './cartItems.resolver';
import { CartitemsService } from './cartitems.service';

@Module({
  providers: [CartitemsService, PrismaService, CartItemResolver, UsersService],
  // imports: [ProductsService]
})
export class CartitemsModule { }
