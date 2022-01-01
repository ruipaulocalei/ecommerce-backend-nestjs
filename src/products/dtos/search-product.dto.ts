import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Product } from "generated/client";
import { OutputDto } from "src/common/dtos/output.dto";
import { ProductModel } from "src/models/products.model";

@InputType()
export class SearchProductInput extends PickType(ProductModel, ['name']) { }

@ObjectType()
export class SearchProductOutput extends OutputDto {
  @Field(() => [ProductModel], { nullable: true })
  products?: Product[]
}