import { Body, Controller, DefaultValuePipe, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { NovelService } from '../service/novel.service';
import { NovelDto, OptionalNovelDto } from '../dto/novel.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ReviewService } from '../../review/service/review.service';


@Controller('novels')
@ApiTags('novels API')
export class NovelController {


    constructor(private readonly novelService: NovelService,
                private readonly reviewService: ReviewService) {
    }

    @Get()
    @ApiQuery({
        name: 'query',
        required: false,
        type: String
    })
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'default 1'
    })
    @ApiQuery({
        name: 'pageSize',
        required: false,
        type: Number,
        description: 'default 20'
    })
    @ApiOperation({ description: '소설 검색 및 페이지네이션' })
    async findNovelByPagination(@Query('query', new DefaultValuePipe('')) query: string,
                                @Query('page', new DefaultValuePipe(1)) page: number,
                                @Query('pageSize', new DefaultValuePipe(20)) pageSize: number) {
        const pagination = await this.novelService.findNovelByPagination(query, page, pageSize);
        const { data: novels, ...rest } = pagination;
        return {
            statusCode: 200,
            data: {
                items: novels,
                ...rest
            }
        };
    }

    @Get(':id/reviews')
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'default 1'
    })
    @ApiQuery({
        name: 'pageSize',
        required: false,
        type: Number,
        description: 'default 20'
    })
    @ApiOperation({ description: '소설 리뷰 페이지네이션' })
    async findReviewByPagination(@Param('id') id: number,
                                 @Query('page', new DefaultValuePipe(1)) page: number,
                                 @Query('pageSize', new DefaultValuePipe(20)) pageSize: number) {
        await this.reviewService.findReviewByPagination(id, page, pageSize);

    }


    @Get(':id')
    @ApiOperation({ description: '소설 id 조회' })
    async findNovelById(@Param('id') id: number) {
        const novel = await this.novelService.findNovelById(id);
        return {
            statusCode: 200,
            data: novel
        };
    }

    @Post()
    @ApiOperation({ summary: '소설 생성' })
    async createNovel(@Body() novelDto: NovelDto) {
        const novel = await this.novelService.createNovel(novelDto);
        return {
            statusCode: 201,
            data: novel
        };
    }

    @Patch(':id')
    @ApiOperation({ description: '소설 데이터 수정' })
    async updateNovelById(@Param('id') id: number, @Body() novelDto: OptionalNovelDto) {
        const novel = await this.novelService.updateNovelById(id, novelDto);
        return {
            statusCode: 200,
            data: novel
        };
    }

    @Delete(':id')
    @ApiOperation({ description: '소설 삭제' })
    async deleteById(@Param('id') id: number) {
        await this.novelService.deleteNovelById(id);
        return {
            statusCode: 204
        };
    }
}
