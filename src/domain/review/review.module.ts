import { Module } from '@nestjs/common';
import { ReviewService } from './service/review.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ReviewController } from './controller/review.controller';

@Module({
    providers: [ReviewService, PrismaService],
    controllers: [ReviewController],
})
export class ReviewModule{}
