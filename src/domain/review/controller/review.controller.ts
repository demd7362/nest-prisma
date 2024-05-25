import { Body, Controller, Delete, Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { Review } from '@prisma/client';
import { ReviewService } from '../service/review.service';
import { OptionalReviewCommentDto, OptionalReviewDto, ReviewCommentDto, ReviewDto } from '../dto/review.dto';
import { ResponseBody } from '../../../types/response';

@Controller('reviews')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) {
    }

    @Get(':id')
    async findReviewById(@Param('id') id: number): Promise<ResponseBody> {
        const review = await this.reviewService.findReviewById(id);
        return {
            statusCode: 200,
            data: review
        };
    }

    @Post()
    async createReview(@Body() reviewDto: ReviewDto): Promise<ResponseBody> {
        const review = await this.reviewService.createReview(reviewDto);
        return {
            statusCode: 201,
            data: review
        };
    }

    @Patch(':id')
    async updateReviewById(@Param('id') id: number, @Body() reviewDto: OptionalReviewDto): Promise<ResponseBody> {
        const review = await this.reviewService.updateReviewById(id, reviewDto);
        return {
            statusCode: 200,
            data: review
        };
    }

    @Delete(':id')
    async deleteReviewById(@Param('id') id: number): Promise<ResponseBody> {
        await this.reviewService.deleteReviewById(id);
        return {
            statusCode: 204
        };
    }

    @Get(':reviewId/comments')
    async findCommentByReviewId(@Param('reviewId') reviewId: number) {
        const reviewComments = await this.reviewService.findCommentByReviewId(reviewId);
        return {
            statusCode: 200,
            data: reviewComments
        };
    }

    @Post(':reviewId/comments')
    async createComment(@Param('reviewId') reviewId: number, @Body() reviewCommentDto: ReviewCommentDto) {
        const comment = await this.reviewService.createComment(reviewId, reviewCommentDto);
        return {
            statusCode: 201,
            data: comment
        };
    }

    @Patch('comments/:commentId')
    async updateCommentById(@Param('commentId') commentId: number, @Body() reviewCommentDto: OptionalReviewCommentDto) {
        const comment = await this.reviewService.updateCommentById(commentId, reviewCommentDto);
        return {
            statusCode: 200,
            data: comment
        };
    }

    @Delete('comments/:commentId')
    async deleteCommentById(@Param('commentId') commentId: number) {
        await this.reviewService.deleteCommentById(commentId);
        return {
            statusCode: 204,
        };
    }

}
