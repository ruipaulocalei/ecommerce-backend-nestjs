import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Order, Product } from "generated/client";
import { OrderModel } from "./orders.model";
import { ProductModel } from "./products.model";

@InputType('OrderItemModelPrisma', { isAbstract: true })
@ObjectType()
export class OrderItemModel {
  @Field(type => String)
  id: string
  @Field(type => Number)
  quantity: number
  @Field(type => String, { nullable: true })
  charge?: string

  @Field(type => [ProductModel])
  products: Product[]

  @Field(type => OrderModel)
  order: Order

  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}