import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber } from 'class-validator'
import { ProductModel } from "./products.model";
import { UserModel } from "./users.model";

@InputType('CartItemModelPrisma', { isAbstract: true })
@ObjectType()
export class CartItemModel {
  @Field(type => String)
  id: string
  @Field(type => Number, { defaultValue: 1 })
  @IsNumber()
  quantity: number

  @Field(type => UserModel)
  user: UserModel

  @Field(type => ProductModel)
  product: ProductModel

  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}