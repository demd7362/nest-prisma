import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as process from 'process';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('API docs')
        .setDescription('API Descriptions')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    const corsOptions: CorsOptions = {
        origin: process.env.FRONTEND_URL,
        methods: 'GET,PUT,PATCH,POST,DELETE',
        credentials: true
    };
    app.use(cookieParser())
        .useGlobalPipes(new ValidationPipe({
            whitelist: true, // dto에 정의되지 않은 속성이 들어오면 자동으로 제거
            transform: true, // dto에 정의된 필드 유형이 일치하지 않는 경우 자동으로 타입 변환. 예를 들어 문자열을 숫자로 변환
            transformOptions: {
                enableImplicitConversion: true // 문자열에서 숫자, 불리언 또는 배열로의 암시적 변환이 가능
            }
            // dismissDefaultMessages: true
        }))
        .setGlobalPrefix('api')
        .useGlobalFilters(new HttpExceptionFilter())
        .enableCors(corsOptions);
    await app.listen(80);
}

bootstrap().then(() => Logger.log('nestify running'));
