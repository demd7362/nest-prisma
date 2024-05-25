import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JoinRequestDto, LoginRequestDto } from '../dto/auth.dto';


@Injectable()
export class AuthService {


    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) {
    }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return null;
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginRequestDto: LoginRequestDto): Promise<string | null> {
        const { email, password } = loginRequestDto;
        const $user: User = await this.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!$user) {
            throw new BadRequestException("잘못된 아이디입니다.");
        }
        const isValid = await bcrypt.compare(password, $user.password);
        if (!isValid) {
            throw new BadRequestException("잘못된 패스워드입니다.");
        }
        const payload = {
            email: loginRequestDto.email,
            sub: $user.username,
            id: $user.id
        };
        return this.jwtService.sign(payload);
    }


    async join(joinRequestDto: JoinRequestDto) {
        const { username, password, email } = joinRequestDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const $userByUsername = await this.prisma.user.findUnique({
            where: {
                username
            }
        });
        if ($userByUsername) {
            throw new ConflictException('닉네임이 중복됩니다.');
        }
        const $userByEmail = await this.prisma.user.findUnique({
            where: {
                email
            }
        });
        if ($userByEmail) {
            throw new ConflictException('이메일이 중복됩니다.');
        }
        const currentDate = new Date();
        const $newUser = await this.prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                createdAt: currentDate,
                lastLoggedInAt: currentDate
            }
        });
    }
}
