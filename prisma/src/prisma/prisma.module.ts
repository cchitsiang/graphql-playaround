import { Module } from '@nestjs/common';
import { CrudResolvers } from './prisma.provider';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, ...CrudResolvers],
  exports: [PrismaService],
})
export class PrismaModule {}
