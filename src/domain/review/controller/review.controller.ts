import { Body, Controller, DefaultValuePipe, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ReviewService } from '../service/review.service';
import { OptionalReviewCommentDto, OptionalReviewDto, ReviewCommentDto, ReviewDto } from '../dto/review.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('reviews')
@ApiTags('reviews API')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) {
    }

    @Get(':id')
    @ApiOperation({ description: '리뷰 id 조회' })
    async findReviewById(@Param('id') id: number) {
        const review = await this.reviewService.findReviewById(id);
        return {
            statusCode: 200,
            data: review
        };
    }



    @Post()
    @ApiOperation({ description: '리뷰 생성' })
    async createReview(@Body() reviewDto: ReviewDto) {
        const review = await this.reviewService.createReview(reviewDto);
        return {
            statusCode: 201,
            data: review
        };
    }

    @Patch(':id')
    @ApiOperation({ description: '리뷰 데이터 수정' })
    async updateReviewById(@Param('id') id: number, @Body() reviewDto: OptionalReviewDto) {
        const review = await this.reviewService.updateReviewById(id, reviewDto);
        return {
            statusCode: 200,
            data: review
        };
    }

    @Delete(':id')
    @ApiOperation({ description: '리뷰 데이터 삭제' })
    async deleteReviewById(@Param('id') id: number) {
        await this.reviewService.deleteReviewById(id);
        return {
            statusCode: 204
        };
    }

    @Get(':reviewId/comments')
    @ApiOperation({ description: '리뷰 id 하위 댓글 조회' })
    async findCommentByReviewId(@Param('reviewId') reviewId: number) {
        const reviewComments = await this.reviewService.findCommentByReviewId(reviewId);
        return {
            statusCode: 200,
            data: reviewComments
        };
    }

    @Post(':reviewId/comments')
    @ApiOperation({ description: '리뷰 id 하위 댓글 생성' })
    async createComment(@Param('reviewId') reviewId: number, @Body() reviewCommentDto: ReviewCommentDto) {
        const comment = await this.reviewService.createComment(reviewId, reviewCommentDto);
        return {
            statusCode: 201,
            data: comment
        };
    }

    @Patch('comments/:commentId')
    @ApiOperation({ description: '댓글 id로 데이터 수정' })
    async updateCommentById(@Param('commentId') commentId: number, @Body() reviewCommentDto: OptionalReviewCommentDto) {
        const comment = await this.reviewService.updateCommentById(commentId, reviewCommentDto);
        return {
            statusCode: 200,
            data: comment
        };
    }

    @Delete('comments/:commentId')
    @ApiOperation({ description: '댓글 id로 데이터 삭제' })
    async deleteCommentById(@Param('commentId') commentId: number) {
        await this.reviewService.deleteCommentById(commentId);
        return {
            statusCode: 204
        };
    }

}
