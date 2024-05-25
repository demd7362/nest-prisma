import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CommonDto } from '../../../common/dto/common.dto';
import { PartialType } from '@nestjs/swagger';
import { DefaultValuePipe } from '@nestjs/common';
import { Expose } from 'class-transformer';

export class ReviewDto extends CommonDto {

    @IsNumber()
    @IsOptional()
    @Expose()
    id?: number;

    @IsString()
    @Expose()
    content: string;

    @IsNumber()
    @IsOptional()
    @Expose()
    like?: number;

    @IsNumber()
    @IsOptional()
    @Expose()
    dislike?: number;

    @IsNumber()
    @Expose()
    novelId: number;

    @IsNumber()
    @Expose()
    userId: number;
}

export class OptionalReviewDto extends PartialType(ReviewDto) {

}

export class ReviewCommentDto extends CommonDto {

    @IsNumber()
    @IsOptional()
    @Expose()
    id?: number;

    @IsString()
    @Expose()
    content: string;

    @IsNumber()
    @IsOptional()
    @Expose()
    like?: number;
    @IsNumber()
    @IsOptional()
    @Expose()
    dislike?: number;
    @IsNumber()
    @IsOptional()
    @Expose()
    reviewId?: number;
    @IsNumber()
    @IsOptional()
    @Expose()
    userId?: number;

}

export class OptionalReviewCommentDto extends PartialType(ReviewCommentDto) {}
