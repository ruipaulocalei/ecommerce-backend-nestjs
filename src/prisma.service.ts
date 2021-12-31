import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
// import { PrismaClient } from "../generated/client";
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    this.$connect
  }
  async onModuleDestroy() {
    this.$disconnect
  }
}