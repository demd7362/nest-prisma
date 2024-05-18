import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function bootstrap() {
  NestFactory.create(AppModule).then(app => app.listen(3000));
}
bootstrap();
