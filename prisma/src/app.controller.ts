import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly prisma: PrismaService) {}

  @Get('users')
  indexUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
