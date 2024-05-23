import { IsArray, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

export class NovelDto {
    @IsNumber()
    @Expose()
    id: number;

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

    @Exclude()
    createdAt: Date;
    @Exclude()
    updatedAt: Date;




}
