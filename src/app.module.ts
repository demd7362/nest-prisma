import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';

@Module({
    imports: [AuthModule, UserModule,PrismaModule,
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true
        }),
    ],
    controllers: [AppController]
})
export class AppModule {
}
