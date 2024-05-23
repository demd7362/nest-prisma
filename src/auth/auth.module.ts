import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './providers/auth.service';
import { LocalStrategy } from './providers/local.strategy';
import { JwtStrategy } from './providers/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './controller/auth.controller';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '60s' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        PrismaService
    ],
    controllers: [
        AuthController
    ]
})
export class AuthModule {}
