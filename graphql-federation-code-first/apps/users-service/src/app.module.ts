import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { UsersModule } from './users.module';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: 'user.gql',
      playground: true
    }),
    UsersModule,
  ],
})
export class AppModule {}
