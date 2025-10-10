import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';
    let details: any = null;

    // 🔹 Erros do tipo HttpException (BadRequest, NotFound, etc.)
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      status = exception.getStatus();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const r = exceptionResponse as any;
        message = r.message || message;
        details = r.error || null;
      }
    }
    // 🔹 Erros genéricos (ex: exceptions do Mongo ou runtime)
    else if (exception instanceof Error) {
      message = exception.message;
      details = exception.stack?.split('\n').slice(0, 3); // só mostra as 3 primeiras linhas
    }

    // 🔹 Log completo no servidor
    this.logger.error(
      `[${request.method}] ${request.url} → ${message}`,
      (exception as any)?.stack,
    );

    // 🔹 Retorno padronizado (compatível com ResponseInterceptor)
    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: status,
      message,
      details,
    });
  }
}
