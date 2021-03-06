import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { OrderItem, User } from "generated/client";
import { OrderItemModel } from "./order-item.model";
import { UserModel } from "./users.model";

@InputType('OrderModelPrisma', { isAbstract: true })
@ObjectType()
export class OrderModel {
  @Field(type => String)
  id: string
  @Field(type => Number, { defaultValue: 0 })
  total: number
  @Field(type => String, { nullable: true })
  charge?: string

  @Field(type => UserModel)
  user: User

  @Field(type => [OrderItemModel])
  items: OrderItem[]

  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}