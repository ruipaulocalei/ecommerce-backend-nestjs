import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserOutput } from './dtos/create-user.dto';
import { compare, hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  async createUser({ name, email, password }: Prisma.UserCreateInput): Promise<CreateUserOutput> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email
        }
      })
      if (user) {
        return {
          ok: false,
          error: 'This account was already taken'
        }
      }
      const hashedPassword = await hash(password, 10)
      await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      })
      return {
        ok: true,
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An unexpected error occured'
      }
    }
  }
}
