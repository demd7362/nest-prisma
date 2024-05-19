import { Controller, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../providers/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    // @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(){
        return "hi"
        // console.log(req);
        // return this.authService.login(req.user);
    }

}
