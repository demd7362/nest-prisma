import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';


export interface GoogleAuth {
    email: string;
    name: string;
    photo: string;
}

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly config: ConfigService) {
        super({
            clientID: config.get('GOOGLE_CLIENT_ID'),
            clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: config.get('GOOGLE_CALLBACK_URL'),
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        try {
            console.log(accessToken);
            const { name, emails, photos } = profile;
            console.log('🚀 🔶 GoogleStrategy 🔶 validate 🔶 profile:', profile);
            const user: GoogleAuth = {
                email: emails[0].value,
                name: name.familyName + name.givenName,
                photo: photos[0].value
            };
            console.log('🚀 🔶 GoogleStrategy 🔶 validate 🔶 user:', user);
            done(null, user);
        } catch (error) {
            done(error);
        }
    }
}
