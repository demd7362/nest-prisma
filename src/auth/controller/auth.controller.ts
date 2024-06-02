import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Provider } from '../../common/enums/provider';
import { GoogleAuth } from '../strategies/jwt.google.strategy';
import { ConfigService } from '@nestjs/config';
import { KakaoAuth } from '../strategies/jwt.kakao.strategy';
import { NaverAuth } from '../strategies/jwt.naver.strategy';
import { ApiExcludeEndpoint, ApiHideProperty, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('auth')
@ApiTags('auth API')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly config: ConfigService
    ) {
    }

    @Get('login/google')
    @ApiOperation({ description: '구글 로그인 요청 URL' })
    @ApiResponse({description:'액세스 토큰 쿠키 반환'})
    @UseGuards(AuthGuard('google'))
    async loginWithGoogle(@Req() req: Request, @Res() res: Response) {
    }

    @Get('login/kakao')
    @ApiOperation({ description: '카카오 로그인 요청 URL' })
    @ApiResponse({description:'액세스 토큰 쿠키 반환'})
    @UseGuards(AuthGuard('kakao'))
    async loginWithKakao(@Req() req: Request, @Res() res: Response) {
    }

    @Get('login/naver')
    @ApiOperation({ description: '네이버 로그인 요청 URL' })
    @ApiResponse({description:'액세스 토큰 쿠키 반환'})
    @UseGuards(AuthGuard('naver'))
    async loginWithNaver(@Req() req: Request, @Res() res: Response) {
    }

    @Get('oauth2/redirect/google')
    @ApiExcludeEndpoint()
    @UseGuards(AuthGuard('google'))
    async googleRedirect(@Req() req, @Res() res: Response) {
        const user = req.user as GoogleAuth;
        const { email } = user;
        const { accessToken } = await this.authService.login(email, Provider.GOOGLE);
        console.log(accessToken);
        res.cookie('$at', accessToken, {
            httpOnly: true
        });
        res.redirect(this.config.get('FRONTEND_URL'));
    }

    @Get('oauth2/redirect/kakao')
    @ApiExcludeEndpoint()
    @UseGuards(AuthGuard('kakao'))
    async kakaoRedirect(@Req() req, @Res() res: Response) {
        const user = req.user as KakaoAuth;
        const { email } = user;
        const { accessToken } = await this.authService.login(email, Provider.KAKAO);
        console.log(accessToken);
        res.cookie('$at', accessToken, {
            httpOnly: true
        });
        res.redirect(this.config.get('FRONTEND_URL'));
    }

    @Get('oauth2/redirect/naver')
    @ApiExcludeEndpoint()
    @UseGuards(AuthGuard('naver'))
    async naverRedirect(@Req() req, @Res() res: Response) {
        const user = req.user as NaverAuth;
        const { email } = user;
        const { accessToken } = await this.authService.login(email, Provider.NAVER);
        console.log(accessToken);
        res.cookie('$at', accessToken, {
            httpOnly: true
        });
        res.redirect(this.config.get('FRONTEND_URL'));
    }


}
