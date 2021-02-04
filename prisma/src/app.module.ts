import { resolve } from 'path';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';
import { TypeGraphQLModule } from 'typegraphql-nestjs';
import { AppController } from './app.controller';
import { isDevMode } from './app.environment';
import { AppService } from './app.service';
import { CommonModule } from './common/shared.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

interface Context {
  req: any;
  prisma: PrismaClient;
}

@Module({
  imports: [
    CommonModule.forRoot(),
    TypeGraphQLModule.forRootAsync({
      imports: [PrismaModule],
      inject: [PrismaService],
      useFactory(prisma: PrismaService) {
        return {
          cors: true,
          debug: isDevMode,
          playground: true,
          emitSchemaFile: resolve(__dirname, './schema.graphql'),
          dateScalarMode: 'timestamp',
          validate: false,
          introspection: true,
          context: ({ req, connection }): Context => (connection ? { req: connection.context, prisma } : { req, prisma }),
        };
      },
    }),
    CqrsModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Purposely leave empty
  }
}
