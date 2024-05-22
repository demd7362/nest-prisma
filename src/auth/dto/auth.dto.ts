import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequestDTO {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6)
    password: string;
}
export class JoinRequestDTO {
    @IsString()
    @Length(2)
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(6)
    passwordCheck: string;


}
