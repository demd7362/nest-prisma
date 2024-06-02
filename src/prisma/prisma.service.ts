import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: ['query', 'info', 'warn', 'error'],
            transactionOptions: {
                timeout: 300000,  // 300초 , 디버깅용
                maxWait: 5000 // 5초
            }
        });
    }
    async onModuleDestroy() {
        await this.$connect();
    }

    async onModuleInit() {
        await this.$disconnect();
    }



}
