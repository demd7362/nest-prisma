import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CommonDto {
    @Exclude()
    @IsOptional()
    createdAt?: Date;
    @Exclude()
    @IsOptional()
    updatedAt?: Date;
}
