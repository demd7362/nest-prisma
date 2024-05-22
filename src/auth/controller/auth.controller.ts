import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from '../providers/auth.service';
import { Response } from 'express';
import { JoinRequestDTO, LoginRequestDTO } from '../dto/auth.dto';
import { ResponseBody } from '../../types/response';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginRequestDTO: LoginRequestDTO, @Res() response: Response) {
        const accessToken = await this.authService.login(loginRequestDTO);
        response.cookie('$at', accessToken, {
            httpOnly: true
        });
        response.status(200).json({
            statusCode: 200,
            message: '회원가입 성공'
        });
    }

    @Post('join') // passthrough 있으면 return 값을 통해 리턴이 가능하다
    async join(@Body() joinRequestDTO: JoinRequestDTO) {
        await this.authService.join(joinRequestDTO);
        const body: ResponseBody = {
            statusCode: 201,
            message: '회원가입 완료'
        };
        return body;
        // response.status(201).json(body);
    }

}
