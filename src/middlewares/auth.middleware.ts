import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) { }
  async use(req: Request, res: Response, next: NextFunction) {
    if ('jwt-token' in req.headers) {
      const token = req.headers['jwt-token']
      const decoded = verify(token.toString(), "hgffgcff6gf@bgfghgcgbf")
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const user = await this.usersService.findUserById({ id: decoded['id'] })
        req['user'] = user
      }
    }
    next()
  }
}