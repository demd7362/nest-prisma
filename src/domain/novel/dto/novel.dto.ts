import { IsArray, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';


export class NovelDto {
    @IsNumber()
    @Expose()
    @IsOptional()
    private id?: number;

    @IsString()
    @Expose()
    @ApiProperty({ description: '제목'})
    title: string;

    @IsString()
    @Expose()
    @ApiProperty({ description: '작가'})
    author: string;

    @IsString()
    @IsOptional()
    @Expose()
    @ApiProperty({ description: '카카오 링크 url', required: false })
    kakaoUrl?: string;

    @IsString()
    @IsOptional()
    @Expose()
    @ApiProperty({ description: '네이버 링크 url', required: false })
    naverUrl?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '문피아 링크 url', required: false })
    munpiaUrl?: string;

    @IsString()
    @Expose()
    @ApiProperty({ description: '이미지 url'})
    imgUrl: string;

    @IsNumber()
    @Expose()
    @ApiProperty({ description: '별점'})
    rating: number;

    @IsDate()
    @Expose()
    @ApiProperty({ description: '출간일'})
    releasedAt: Date;

    @IsOptional()
    @Expose()
    @IsArray()
    @ApiProperty({ description: '해시태그'})
    hashTags?: string[];

}

export class OptionalNovelDto extends PartialType(NovelDto) {

}
