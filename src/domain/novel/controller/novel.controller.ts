import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from '@nestjs/common';
import { NovelService } from '../providers/novel.service';
import { NovelDto } from '../dto/novel.dto';
import { Response } from 'express';
import { ResponseBody } from '../../../types/response';

@Controller('novels')
export class NovelController {


    constructor(private readonly novelService: NovelService) {
    }

    @Get()
    findAllNovel() {
        return this.novelService.findAllNovel();
    }

    @Get(':id')
    @HttpCode(200)
    async findNovelById(@Param('id') id: number): Promise<ResponseBody<NovelDto>> {
        const novels = await this.novelService.findNovelById(id);
        return {
            statusCode: 200,
            data: novels
        };
    }

    @Post()
    createNovel(@Body() novelDto: NovelDto) {
        return this.novelService.createNovel(novelDto);
    }

    @Patch(':id')
    updateNovel(@Body() novelDto: NovelDto) {
        return this.novelService.updateNovel(novelDto);
    }

    @Delete(':id')
    deleteNovelById(@Param('id') id: number) {
        return this.novelService.deleteNovelById(id);
    }
}
