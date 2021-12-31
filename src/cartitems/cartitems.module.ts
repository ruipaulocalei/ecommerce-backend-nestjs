import { Module } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { CartitemsService } from './cartitems.service';

@Module({
  providers: [CartitemsService, UsersService, ProductsService],
})
export class CartitemsModule { }
