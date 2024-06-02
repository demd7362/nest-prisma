import { NovelDto } from '../domain/novel/dto/novel.dto';
import { ApiProperty } from '@nestjs/swagger';


export abstract class BaseResponse {
    @ApiProperty()
    message: string;
    @ApiProperty()
    error: string;
    @ApiProperty()
    statusCode: number;
}

export class Novel {
    @ApiProperty()
    items: NovelDto[] & Pagination<NovelDto>;
}

export class NovelResponse extends BaseResponse {
    @ApiProperty()
    data: Novel
}




export class Pagination<T> {
    @ApiProperty()
    data: T | T[];
    @ApiProperty()
    totalCount: number;
    @ApiProperty()
    page: number;
    @ApiProperty()
    pageSize: number;
    @ApiProperty()
    totalPages: number;
    @ApiProperty()
    hasPreviousPage: boolean;
    @ApiProperty()
    hasNextPage: boolean;
}
