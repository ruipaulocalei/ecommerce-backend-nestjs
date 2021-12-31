import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { ProductModel } from "src/models/products.model";
import { CreateProductInput, CreateProductOutput } from "./dtos/create-product.dto";
import { ProductsService } from "./products.service";

@Resolver(of => ProductModel)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }
  @Mutation(() => CreateProductOutput)
  @UseGuards(AuthGuard)
  createProduct(@Args('input') { name, image, price, description }: CreateProductInput) {
    return this.productsService.createProduct({ name, image, price, description })
  }
}