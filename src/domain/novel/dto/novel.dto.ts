import { IsArray, IsDate, IsNumber, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

export class NovelDto {
    @IsNumber()
    @Expose()
    @IsOptional()
    id?: number;

    @IsString()
    @Expose()
    title: string;

    @IsString()
    @Expose()
    author: string;

    @IsString()
    @IsOptional()
    @Expose()
    kakaoUrl?: string;

    @IsString()
    @IsOptional()
    @Expose()
    naverUrl?: string;

    @IsString()
    @IsOptional()
    munpiaUrl?: string;

    @IsString()
    @Expose()
    imgUrl: string;

    @IsNumber()
    @Expose()
    rating: number;

    @IsDate()
    @Expose()
    releasedAt: Date;

}
export class OptionalNovelDto extends PartialType(NovelDto){

}
