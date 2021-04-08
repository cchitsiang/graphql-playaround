import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLGatewayModule.forRoot({
      gateway: {
        debug: true,
        // eslint-disable-next-line @typescript-eslint/camelcase
        experimental_pollInterval:5000,
        serviceList: [
          { name: 'users', url: 'http://localhost:3010/graphql' },
          { name: 'posts', url: 'http://localhost:3011/graphql' },
        ],
        serviceHealthCheck: true,
      },
      server: {
        context: ({ req }) => ({ authorization: req.headers.authorization }),
      },
    }),
  ],
})
export class AppModule {}
