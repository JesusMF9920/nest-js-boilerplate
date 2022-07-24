import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiResponse as NestApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';

export enum DocumentationTags {
  META = 'Meta',
  USERS = 'Users',
}

export type Options = {
  tags: DocumentationTags[];
};

export function Endpoint(options: ApiResponseOptions & Options) {
  if (options.status && typeof options.status === 'number') {
    return applyDecorators(
      NestApiResponse(options),
      HttpCode(options.status),
      ApiTags(...options.tags),
    );
  }

  return applyDecorators(NestApiResponse(options), ApiTags(...options.tags));
}
