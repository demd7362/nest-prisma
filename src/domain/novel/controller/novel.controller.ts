import { Body, Controller, DefaultValuePipe, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { NovelService } from '../service/novel.service';
import { NovelDto, OptionalNovelDto } from '../dto/novel.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('novels')
@ApiTags('novels')
export class NovelController {


    constructor(private readonly novelService: NovelService) {
    }

    // @Get()
    // @ApiResponse({ status: 200, description: '모든 웹소설 목록 반환' })
    // @ApiBody({ type: NovelDto })
    // async findAll() {
    //     const novels = await this.novelService.findAll();
    //     return {
    //         statusCode: 200,
    //         data: novels
    //     };
    // }


    @Get()
    async findNovelByPagination(@Query('search', new DefaultValuePipe('')) search: string, @Query('page') page: number, @Query('pageSize') pageSize: number) {
        const pagination = await this.novelService.findNovelByPagination(search, page, pageSize);
        const { data: novels, ...rest } = pagination;
        return {
            statusCode: 200,
            data: {
                items: novels,
                ...rest
            }
        };
    }

    @Get(':id')
    async findNovelById(@Param('id') id: number) {
        const novel = await this.novelService.findNovelById(id);
        return {
            statusCode: 200,
            data: novel
        };
    }

    @Post()
    async createNovel(@Body() novelDto: NovelDto) {
        const novel = await this.novelService.createNovel(novelDto);
        return {
            statusCode: 201,
            data: novel
        };
    }

    @Patch(':id')
    async updateNovelById(@Param('id') id: number, @Body() novelDto: OptionalNovelDto) {
        const novel = await this.novelService.updateNovelById(id, novelDto);
        return {
            statusCode: 200,
            data: novel
        };
    }

    @Delete(':id')
    async deleteById(@Param('id') id: number) {
        await this.novelService.deleteNovelById(id);
        return {
            statusCode: 204
        };
    }
}
