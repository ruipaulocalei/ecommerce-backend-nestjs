import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { ProductModel } from "src/models/products.model";
import { CreateProductInput, CreateProductOutput } from "./dtos/create-product.dto";
import { GetProductInput, GetProductOutput } from "./dtos/get-product.dto";
import { SearchProductInput, SearchProductOutput } from "./dtos/search-product.dto";
import { ProductsService } from "./products.service";

@Resolver(of => ProductModel)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }
  @Mutation(() => CreateProductOutput)
  @UseGuards(AuthGuard)
  createProduct(@Args('input') { name, image, price, description }: CreateProductInput) {
    return this.productsService.createProduct({ name, image, price, description })
  }

  @Query(() => [ProductModel])
  getProducts() {
    return this.productsService.getProducts()
  }

  @Query(() => GetProductOutput)
  getProduct(@Args('input') { id }: GetProductInput) {
    return this.productsService.getProduct({ id })
  }

  @Query(() => SearchProductOutput)
  search(@Args('input') { name }: SearchProductInput) {
    return this.productsService.search({ name })
  }
}