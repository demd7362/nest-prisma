import { Module } from '@nestjs/common';
import { NovelController } from './controller/novel.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { NovelService } from './service/novel.service';

@Module({
    controllers: [NovelController],
    providers: [PrismaService,NovelService]
})
export class NovelModule{

}
