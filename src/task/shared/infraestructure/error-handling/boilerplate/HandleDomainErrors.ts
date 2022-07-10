import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError } from 'rxjs/operators';
import { Mapper } from './mapDomainError';

@Injectable()
class DomainMapperErrorsInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const mappers = this.reflector.get<Mapper[]>('mappers', context.getHandler());

    return next.handle().pipe(
      catchError((error) => {
        for (const mapper of mappers) {
          const [DomainErrorClass, NestHttpExceptionClass] = mapper;

          if (error instanceof DomainErrorClass) {
            throw new NestHttpExceptionClass({
              code: error.code,
              message: error.message,
            });
          }
        }

        throw error;
      }),
    );
  }
}

export function HandleDomainErrors(mappers: Mapper[]) {
  return applyDecorators(
    SetMetadata('mappers', mappers),
    UseInterceptors(DomainMapperErrorsInterceptor),
  );
}
