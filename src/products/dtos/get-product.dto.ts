import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Product } from "generated/client";
import { OutputDto } from "src/common/dtos/output.dto";
import { ProductModel } from "src/models/products.model";

@InputType()
export class GetProductInput extends PickType(ProductModel, ['id']) { }

@ObjectType()
export class GetProductOutput extends OutputDto {
  @Field(() => ProductModel, { nullable: true })
  product?: Product
}