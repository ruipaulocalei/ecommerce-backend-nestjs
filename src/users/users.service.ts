import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  async createUser({ name, email, password }: Prisma.UserCreateInput) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email
        }
      })
      if (user) {
        console.log('This user was taken')
      }
      await this.prisma.user.create({
        data: {
          name,
          email,
          password
        }
      })
    } catch (error) {

    }
  }
}
