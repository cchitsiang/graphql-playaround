import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    //TODO: Decide logging pattern: https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging
    super({ log: ['query', 'info', 'warn'] });
  }

  async onModuleInit() {
    await this.$connect();

    if ((await this.user.count()) < 1) await this.seedData();
  }

  async seedData() {
    const user = await this.user.create({
      data: {
        fullName: 'Chew Chit Siang',
        phoneNumber: '60167228527',
      },
    });

    const wallet = await this.wallet.create({
      data: {
        balance: 157,
        ownerId: user.id,
      },
    });

    await this.transaction.create({
      data: {
        description: 'Referral Bonus',
        amount: 5,
        walletId: wallet.id,
        createdAt: new Date(2020, 12, 4),
      },
    });
    await this.transaction.create({
      data: {
        description: 'Kiosk - Petronas Subang Jaya',
        amount: -35,
        walletId: wallet.id,
        createdAt: new Date(2020, 12, 15),
      },
    });
    await this.transaction.create({
      data: {
        description: 'Balance Auto Top-up',
        amount: 80,
        walletId: wallet.id,
        createdAt: new Date(2020, 12, 20),
      },
    });
    await this.transaction.create({
      data: {
        description: 'Top-up',
        amount: 60,
        walletId: wallet.id,
        createdAt: new Date(2020, 12, 23),
      },
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
