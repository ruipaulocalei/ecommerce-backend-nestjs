import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) { }
  async canActivate(
    context: ExecutionContext,
  ) {
    const gqlContext = GqlExecutionContext.create(context).getContext()
    const user = gqlContext['user']
    if (!user) {
      return false
    }
    return true
    // const token = gqlContext.token
    // if (token) {
    //   const decoded = verify(token.toString(), 'jhghfvtygh57yghbvrdtugh76ugvhft6')
    //   if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
    //     const user = await this.usersService.findUserById({ id: decoded['id'] })
    //     console.log(user.id)
    //     if (!user) {
    //       return false
    //     } else {
    //       gqlContext['user'] = user
    //       return true
    //     }
    //   }
    // } else {
    //   return false
    // }
  }
}
