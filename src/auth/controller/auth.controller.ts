import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { JoinRequestDto, LoginRequestDto } from '../dto/auth.dto';
import { ResponseBody } from '../../types/response';
import { AuthGuard } from '@nestjs/passport';
import { Provider } from '../../common/enums/provider';
import { GoogleAuth } from '../strategies/jwt.google.strategy';
import { ConfigService } from '@nestjs/config';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly config: ConfigService
                ) {
    }

    // @Get('login/google')
    // @UseGuards(AuthGuard('google'))
    // async loginWithGoogle(@Req() req: Request, @Res() res: Response) {
    // }

    @Get('oauth2/redirect/google')
    @UseGuards(AuthGuard('google'))
    async googleRedirect(@Req() req, @Res() res:Response) {
        const user = req.user as GoogleAuth;
        const { email, name, photo } = user;
        const { accessToken } = await this.authService.login(email, name, photo, Provider.GOOGLE);
        console.log(accessToken);
        res.cookie('$at', accessToken, {
            httpOnly: true
        });
        res.redirect(this.config.get('FRONTEND_URL'));
    }


}
