import { BadRequestException, Injectable } from '@nestjs/common';
import { OptionalReviewCommentDto, OptionalReviewDto, ReviewCommentDto, ReviewDto } from '../dto/review.dto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../../prisma/prisma.service';
import { Pagination } from '../../../types/response';

@Injectable()
export class ReviewService {
    constructor(private readonly prisma: PrismaService) {
    }


    async findReviewById(id: number) {
        const $reviews = await this.prisma.review.findUnique({
            where: {
                id
            }
        });
        if (!$reviews) {
            throw new BadRequestException(`'${id}' 잘못된 id 값입니다.`);
        }
        return plainToInstance(ReviewDto, $reviews);
    }

    async findReviewByPagination(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const [reviews, totalCount] = await this.prisma.$transaction([
            this.prisma.review.findMany({ skip, take, orderBy: { createdAt: 'desc' } }),
            this.prisma.review.count()
        ]);

        const totalPages = Math.ceil(totalCount / pageSize);
        const hasPreviousPage = page > 1;
        const hasNextPage = page < totalPages;

        const pagination: Pagination<ReviewDto> = {
            data: plainToInstance(ReviewDto, reviews),
            totalCount,
            pageNumber: page,
            pageSize,
            totalPages,
            hasPreviousPage,
            hasNextPage
        };

        return pagination;
    }

    async createReview(reviewDto: ReviewDto) {
        const $review = await this.prisma.review.create({
            data: {
                ...reviewDto,
                createdAt: new Date()
                // novel: { connect: { id: novelId } },
                // user: { connect: { id: userId } }
            }
        });
        return plainToInstance(ReviewDto, $review);
    }

    async updateReviewById(id: number, reviewDto: OptionalReviewDto) {
        const $review = await this.prisma.review.update({
            where: { id },
            data: reviewDto
        });
        return plainToInstance(ReviewDto, $review);
    }

    async deleteReviewById(id: number) {
        await this.prisma.review.delete({
            where: { id }
        });
    }

    /*
    리뷰 코멘트
     */
    async createComment(reviewId: number, reviewCommentDto: ReviewCommentDto) {
        const $reviewComment = await this.prisma.reviewComment.create({
            data: {
                ...reviewCommentDto,
                createdAt: new Date(),
                reviewId,
                userId: 1 // 테스트용
            }
        });
        return plainToInstance(ReviewCommentDto, $reviewComment);
    }

    async updateCommentById(commentId: number, reviewCommentDto: OptionalReviewCommentDto) {
        const $reviewComment = await this.prisma.reviewComment.update({
            where: {
                id: commentId
            },
            data: reviewCommentDto
        });
        return plainToInstance(ReviewCommentDto, $reviewComment);
    }

    async findCommentByReviewId(reviewId: number) {
        const $reviewComments = await this.prisma.reviewComment.findMany({
            where: {
                reviewId
            }
        });
        return plainToInstance(ReviewDto, $reviewComments);
    }

    async deleteCommentById(commentId: number) {
        await this.prisma.reviewComment.delete({
            where: {
                id: commentId
            }
        });
    }
}
