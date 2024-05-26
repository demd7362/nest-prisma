import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { NovelDto, OptionalNovelDto } from '../dto/novel.dto';
import { plainToInstance } from 'class-transformer';
import { Pagination } from '../../../types/response';


@Injectable()
export class NovelService {


    constructor(private readonly prisma: PrismaService) {
    }


    async findNovelById(novelId: number) {
        const $novel = await this.prisma.novel.findUnique({
            where: {
                id: novelId
            }
        });
        if (!$novel) {
            throw new BadRequestException(`잘못된 id : ${novelId}`);
        }
        return plainToInstance(NovelDto, $novel);
    }

    async findNovelByPagination(searchValue: string, page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const where = searchValue
            ? {
                OR: [
                    { title: { contains: searchValue } },
                    { author: { contains: searchValue } },
                    { hashTag: { some: { value: searchValue } } }
                ]
            }
            : undefined;
        const $novels = await this.prisma.novel.findMany({
            where,
            skip,
            take,
            orderBy: {
                createdAt: 'desc'
            }
        });


        const totalCount = await this.prisma.novel.count();


        const totalPages = Math.ceil(totalCount / pageSize);
        const hasPreviousPage = page > 1;
        const hasNextPage = page < totalPages;

        const pagination: Pagination<NovelDto> = {
            data: plainToInstance(NovelDto, $novels),
            totalCount,
            pageNumber: page,
            pageSize,
            totalPages,
            hasPreviousPage,
            hasNextPage
        };

        return pagination;
    }
    async createNovel(novelDto: NovelDto) {
        const $novel = this.prisma.$transaction(async (prisma) => {
            return prisma.novel.create({
                data: {
                    ...novelDto,
                    createdAt: new Date()
                }
            });
        })


        return plainToInstance(NovelDto, $novel);
    }

    async updateNovelById(novelId: number, novelDto: OptionalNovelDto) {
        const $novel = await this.prisma.novel.update({
            where: { id: novelId },
            data: novelDto
        });
        return plainToInstance(NovelDto, $novel);
    }

    async deleteNovelById(id: number) {
        await this.prisma.novel.delete({
            where: { id }
        });
    }

    async searchNovel(search: string) {
        // await this.prisma.novel.

    }
}
