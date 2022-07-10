import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiResponse as NestApiResponse } from '@nestjs/swagger';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';

export function Endpoint(options: ApiResponseOptions) {
  if (options.status && typeof options.status === 'number') {
    return applyDecorators(NestApiResponse(options), HttpCode(options.status));
  }

  return applyDecorators(NestApiResponse(options));
}
