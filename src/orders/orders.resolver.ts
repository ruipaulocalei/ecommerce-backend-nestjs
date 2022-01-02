import { UseGuards } from "@nestjs/common";
import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "generated/client";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { OutputDto } from "src/common/dtos/output.dto";
import { OrderModel } from "src/models/orders.model";
import { OrdersService } from "./orders.service";

@Resolver(_ => OrderModel)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) { }
  @Mutation(() => OutputDto)
  @UseGuards(AuthGuard)
  createOrder(@AuthUser() authUser: User) {
    return this.ordersService.createOrder(authUser)
  }
  @Query(() => [OrderModel])
  @UseGuards(AuthGuard)
  getOrders(@AuthUser() authUser: User) {
    return this.ordersService.getOrders(authUser)
  }
}