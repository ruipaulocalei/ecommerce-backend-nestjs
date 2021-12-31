import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'jwt-token'
        return { token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY] }
      }
    }),
    UsersModule,
  ],
})
export class AppModule { }
