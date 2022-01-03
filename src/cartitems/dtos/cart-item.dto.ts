import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { CartItemModel } from "src/models/cart-items.model";

@InputType()
export class CartItemInput {
  @Field(type => String)
  productId: string
}

@ObjectType()
export class CartItemOutput extends OutputDto { }