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
  }
}
