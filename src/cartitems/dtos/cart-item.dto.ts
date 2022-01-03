import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CartItem } from "generated/client";
import { OutputDto } from "src/common/dtos/output.dto";
import { CartItemModel } from "src/models/cart-items.model";

@InputType()
export class CartItemInput {
  @Field(type => String)
  productId: string
}

@ObjectType()
export class CartItemOutput extends OutputDto {
  @Field(type => CartItemModel, { nullable: true })
  carteItem?: CartItem
}