import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class UsersResolver {
  @Query(() => Boolean)
  isGood(): boolean {
    return true
  }
}