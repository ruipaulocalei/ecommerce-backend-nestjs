import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserModel } from "src/models/users.model";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

@Resolver(of => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }
  @Query(() => Boolean)
  isFine(): boolean {
    return true
  }
  @Mutation(() => CreateUserOutput)
  createAccount(@Args('input') { name, email, password }: CreateUserInput) {
    return this.usersService.createAccount({ name, email, password })
  }
}