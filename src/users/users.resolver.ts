import { Query, Resolver } from "@nestjs/graphql";
import { UserModel } from "src/models/users.model";

@Resolver(of => UserModel)
export class UsersResolver {
  @Query(() => Boolean)
  isGood(): boolean {
    return true
  }
}