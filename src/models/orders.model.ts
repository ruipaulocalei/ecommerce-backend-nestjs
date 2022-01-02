import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "generated/client";
import { ProductModel } from "./products.model";
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
  user: UserModel

  // @Field(type => ProductModel)
  // items: Order

  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}