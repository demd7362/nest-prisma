import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { Response } from 'express';
import { Provider } from '../../common/enums/provider';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {


    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly config: ConfigService
    ) {
    }


    async validateGoogleAccessToken(accessToken: string) {
        const url = `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`;
        // const response = await axios.get(url);

    }


    async login(email: string, name: string, photo: string, provider: Provider) {

        let $user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!$user) {
            const now = new Date();
            $user = await this.prisma.user.create({
                data: {
                    email,
                    provider: {
                        connect: { name: provider }
                    },
                    createdAt: now,
                    lastLoggedInAt: now
                },
                include: {
                    provider: true
                }
            });
        }
        const payload = {
            sub: $user.email
        };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }


}
