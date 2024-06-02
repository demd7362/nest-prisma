import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
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

    async findNovelByPagination(query: string, page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const where = query
            ? {
                OR: [
                    { title: { contains: query } },
                    { author: { contains: query } },
                    {
                        novelHashTags: {
                            some: {
                                hashTag: {
                                    value: {
                                        equals: query
                                    }
                                }
                            }
                        }
                    }
                ]
            }
            : undefined;
        const $novels = await this.prisma.novel.findMany({
            where,
            skip,
            take,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                novelHashTags: {
                    include: {
                        hashTag: {
                            select: {
                                value: true
                            }
                        }
                    }
                }
            }
        });


        const totalCount = await this.prisma.novel.count();


        const totalPages = Math.ceil(totalCount / pageSize);
        const hasPreviousPage = page > 1;
        const hasNextPage = page < totalPages;

        const pagination: Pagination<NovelDto> = {
            data: plainToInstance(NovelDto, $novels),
            totalCount,
            page,
            pageSize,
            totalPages,
            hasPreviousPage,
            hasNextPage
        };

        return pagination;
    }

    async createNovel(novelDto: NovelDto) {
        const { hashTags, ...novelData } = novelDto;

        const $existsNovel = await this.prisma.novel.findUnique({
            where: {
                author_title: { // 유니크키가 컬럼 여러개로 묶여져 있을 경우 사용
                    title: novelDto.title,
                    author: novelDto.author
                }
            }
        });
        if ($existsNovel) {
            throw new ConflictException('이미 존재하는 소설입니다.');
        }

        const now = new Date();
        const $novel = await this.prisma.$transaction(async (prisma) => {
            const $novel = await prisma.novel.create({
                data: {
                    ...novelData,
                    createdAt: now
                }
            });
            const $hashTags = await Promise.all(
                hashTags.map(async (hashTag) => {
                    const $hashTag = await prisma.hashTag.upsert({
                        where: { value: hashTag },
                        update: {},
                        create: { value: hashTag, createdAt: now }
                    });
                    await prisma.novelHashTag.create({
                        data: {
                            novel: {
                                connect: {
                                    id: $novel.id
                                }
                            },
                            hashTag: {
                                connect: {
                                    id: $hashTag.id
                                }
                            }
                        }
                    });
                    return $hashTag;
                })
            );


            return $novel;

        });


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
