import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLModule, } from '@nestjs/graphql';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartitemsModule } from './cartitems/cartitems.module';
import { OrdersModule } from './orders/orders.module';
import { graphqlUploadExpress } from 'graphql-upload'

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      uploads: false,
      context: ({ req }) => ({ user: req['user'] })
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CartitemsModule,
    OrdersModule,
  ],
  providers: [AuthMiddleware]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, graphqlUploadExpress({
      maxFiles: 10, maxFileSize: 1e7
    })).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
