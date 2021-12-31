import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { CartItemModel } from "src/models/cart-items.model";
import { ProductModel } from "src/models/products.model";

@InputType()
export class CreateCartItemInput extends PickType(CartItemModel, ['quantity']) {
  @Field(type => String)
  productId: string
}

@ObjectType()
export class CreateCartItemOutput extends OutputDto { }