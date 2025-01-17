import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const errors = exception.getResponse() as any;
        Logger.log(errors);
        response
            .status(status)
            .json({
                statusCode: status,
                message: errors.error,
                errors: errors.message,
            });
    }
}
