import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      // context: ({ req, connection }) => {
      //   const TOKEN_KEY = 'jwt-token'
      //   return { token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY] }
      // }
      context: ({ req }) => ({ user: req['user'] })
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [AuthMiddleware]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
