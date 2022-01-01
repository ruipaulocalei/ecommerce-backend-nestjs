import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "generated/client";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { UserModel } from "src/models/users.model";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UsersService } from "./users.service";

@Resolver(of => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }
  @Mutation(() => CreateUserOutput)
  createAccount(@Args('input') { name, email, password }: CreateUserInput) {
    return this.usersService.createAccount({ name, email, password })
  }
  @Mutation(() => LoginOutput)
  async login(@Args('input') { email, password }: LoginInput) {
    return await this.usersService.login({ email, password })
  }
  @Query(() => UserModel)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    return authUser
  }
}