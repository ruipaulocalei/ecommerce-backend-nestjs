import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserOutput } from './dtos/create-user.dto';
import { compare, hash } from 'bcrypt'
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { sign } from 'jsonwebtoken'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  async createAccount({ name, email, password }: Prisma.UserCreateInput): Promise<CreateUserOutput> {
    try {
      const user = await this.findUserByEmail({ email })
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
  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.findUserByEmail({ email })
      if (!user) {
        return {
          ok: false,
          error: 'This user does not exist'
        }
      }
      const isPasswordCorrect = await compare(password, user.password)
      if (!isPasswordCorrect) {
        return {
          ok: false,
          error: 'Password is wrong'
        }
      }
      const token = sign({ id: user.id }, "hgffgcff6gf@bgfghgcgbf")
      return {
        ok: true,
        token
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An unexpected error occured'
      }
    }
  }
  async findUserByEmail({ email }: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }
  async findUserById({ id }: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }
}
