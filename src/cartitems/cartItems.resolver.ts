import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CartItem, User } from "generated/client";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { CartItemModel } from "src/models/cart-items.model";
import { UserModel } from "src/models/users.model";
import { CartitemsService } from "./cartitems.service";
import { CreateCartItemInput, CreateCartItemOutput } from "./dtos/create-cart-item.dto";

@Resolver(_ => CartItemModel)
export class CartItemResolver {
  constructor(private readonly cartItemsService: CartitemsService) { }
  @Mutation(() => CreateCartItemOutput)
  @UseGuards(AuthGuard)
  addToCart(@AuthUser() authUser: User, @Args('input') { productId }: CreateCartItemInput) {
    return this.cartItemsService.createCartItem(authUser, { productId })
  }

  @Query(() => [CartItemModel])
  @UseGuards(AuthGuard)
  getCartItems(@AuthUser() authUser: User) {
    return this.cartItemsService.getCartItems(authUser)
  }

  @ResolveField(returns => Number)
  subTotal(@Parent() cartItem: CartItem, @AuthUser() authUser: UserModel) {
    return this.cartItemsService.subTotal(authUser, cartItem)
  }

  @ResolveField(returns => String)
  subTotalFormatted(@Parent() cartItem: CartItem, @AuthUser() authUser: UserModel) {
    return this.cartItemsService.subTotalFormatted(authUser, cartItem)
  }
}