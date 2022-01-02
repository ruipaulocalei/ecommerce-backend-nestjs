import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, IsNumber, Length } from 'class-validator'
import { CartItem, OrderItem } from "generated/client";
import { CartItemModel } from "./cart-items.model";
import { OrderItemModel } from "./order-item.model";

@InputType('ProductModelPrisma', { isAbstract: true })
@ObjectType()
export class ProductModel {
  @Field(type => String)
  id: string
  @Field(type => String)
  @IsString()
  name: string

  @Field(type => Number)
  @IsNumber()
  price: number

  @Field(type => String)
  image: string

  @Field(type => String, { nullable: true })
  @Length(10)
  description?: string

  @Field(type => CartItemModel)
  cartItem: CartItem

  @Field(type => OrderItemModel)
  orderItems: OrderItem

  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}