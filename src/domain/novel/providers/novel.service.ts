import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { NovelDto } from '../dto/novel.dto';
import { plainToClass, plainToInstance, TransformInstanceToPlain } from 'class-transformer';


@Injectable()
export class NovelService {


    constructor(private readonly prisma: PrismaService) {
    }

    async findAllNovel() {
        return this.prisma.novel.findMany();
    }

    async findNovelById(id: number) {
        const $novel = await this.prisma.novel.findUnique({
            where: {
                id
            }
        });
        if(!$novel){
            throw new BadRequestException(`'${id}' 잘못된 id 값입니다.`);
        }
        return plainToInstance(NovelDto, $novel);
    }
    async findNovelsByPage(skip: number, take: number): Promise<[NovelDto[], number]> {
        const $novels = await this.prisma.novel.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' },
        });
        const novels = plainToInstance(NovelDto, $novels);
        const totalCount = await this.prisma.novel.count();

        return [novels, totalCount];
    }

    createNovel(novelDto: NovelDto) {
        // return this.prisma.
    }

    updateNovel(novelDto: NovelDto) {

    }

    deleteNovelById(id: number) {

    }
}
