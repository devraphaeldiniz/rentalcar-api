import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Estrutura base da resposta
        const baseResponse: any = {
          success: true,
          timestamp: new Date().toISOString(),
        };

        // Se for uma listagem paginada
        if (
          data &&
          typeof data === 'object' &&
          'data' in data &&
          'total' in data &&
          'page' in data &&
          'limit' in data
        ) {
          return {
            ...baseResponse,
            ...data, // inclui data, total, page, limit
          };
        }

        // Se for um objeto simples (create, update, findOne, delete)
        return {
          ...baseResponse,
          data,
        };
      }),
    );
  }
}
