import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

export class LocalStrategy extends PassportStrategy(Strategy){

    constructor (@Inject(AuthService) private readonly authService:AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    /**
     * 이름이 validate 여야 호출됨
     * @param email
     * @param password
     */
    async validate(email: string, password: string): Promise<any> {
        const $user = await this.authService.validateUser(email, password);
        if (!$user) {
            throw new UnauthorizedException();
        }
        return $user;
    }
}
