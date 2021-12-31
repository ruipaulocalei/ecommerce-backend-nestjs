import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { CartItemModel } from "src/models/cart-items.model";

@InputType()
export class CreateCartItemInput {
  @Field(type => String)
  productId: string
}

@ObjectType()
export class CreateCartItemOutput extends OutputDto { }