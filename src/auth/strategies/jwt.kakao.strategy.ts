import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleAuth } from './jwt.google.strategy';

export interface KakaoAuth extends GoogleAuth {

}

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(private readonly config: ConfigService) {
        super({
            clientID: config.get('KAKAO_CLIENT_ID'),
            clientSecret: config.get('KAKAO_CLIENT_SECRET'),
            callbackURL: config.get('KAKAO_CALLBACK_URL'),
            scope: ['account_email', 'profile_nickname']
        });
    }

    validate(accessToken: string, refreshToken: string, profile: any): KakaoAuth {
        console.log('Kakao Strategy', profile);
        return {
            email: profile._json.kakao_account.email
        };
    }
}
