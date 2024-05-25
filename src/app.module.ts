import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { NovelModule } from './domain/novel/novel.module';
import { ReviewModule } from './domain/review/review.module';

@Module({
    imports: [AuthModule, UserModule, PrismaModule, NovelModule, ReviewModule,
        ConfigModule.forRoot({
            cache: true, // 한 번 읽은 환경 변수의 값을 캐싱하여 읽기 속도를 향상하기 위함
            isGlobal: true // ConfigModule을 다른 모든 모듈에서 불러와야하는 번거로움을 피하기 위함
        })
    ],
    controllers: [AppController]
})
export class AppModule {
}
