import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { ProductModel } from "src/models/products.model";

@InputType()
export class CreateProductInput extends PickType(ProductModel, ['name', 'price', 'image', 'description']) { }

@ObjectType()
export class CreateProductOutput extends OutputDto { }