import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { Injectable } from '@nestjs/common';
import { GoogleAuth } from './jwt.google.strategy';
import { ConfigService } from '@nestjs/config';

export interface NaverAuth extends GoogleAuth {

}

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
    constructor(private readonly config: ConfigService) {
        super({
            clientID: config.get('NAVER_CLIENT_ID'),
            clientSecret: config.get('NAVER_CLIENT_SECRET'),
            callbackURL: config.get('NAVER_CALLBACK_URL')
        });
    }

    validate(accessToken: string, refreshToken: string, profile: any) {
        console.log('Naver Strategy',profile);

        return {
            email: profile._json.email,
        };
    }
}
