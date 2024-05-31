import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './controller/auth.controller';
import { JwtGoogleStrategy } from './strategies/jwt.google.strategy';
import { JwtNaverStrategy } from './strategies/jwt.naver.strategy';
import { JwtKakaoStrategy } from './strategies/jwt.kakao.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (config: ConfigService) => ({
                secret: config.get('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        AuthService,
        PrismaService,
        JwtGoogleStrategy,
        JwtNaverStrategy,
        JwtKakaoStrategy
    ],
    controllers: [
        AuthController
    ]
})
export class AuthModule {}
