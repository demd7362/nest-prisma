import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from '../providers/auth.service';
import { Response } from 'express';
import { JoinRequestDto, LoginRequestDto } from '../dto/auth.dto';
import { ResponseBody } from '../../types/response';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginRequestDto: LoginRequestDto, @Res() response: Response) {
        const accessToken = await this.authService.login(loginRequestDto);
        response.cookie('$at', accessToken, {
            httpOnly: true
        });
        response.status(200).json({
            statusCode: 200,
            message: '회원가입 성공'
        });
    }

    @Post('join') // passthrough 있으면 return 값을 통해 리턴이 가능하다
    async join(@Body() joinRequestDto: JoinRequestDto):Promise<ResponseBody<unknown>> {
        await this.authService.join(joinRequestDto);
        return {
            statusCode: 200,
            message: '로그인 성공'
        }
        // response.status(201).json(body);
    }

}
