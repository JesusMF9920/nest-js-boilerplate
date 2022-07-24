import { Global, Module } from '@nestjs/common';
import { JWT_SERVICE_TOKEN } from './domain/JwtService';
import { JwtServiceNest } from './infraestructure/JwtServiceNest';

@Global()
@Module({
  providers: [
    {
      provide: JWT_SERVICE_TOKEN,
      useClass: JwtServiceNest,
    },
  ],
  exports: [JWT_SERVICE_TOKEN],
})
export class JwtServiceModule {}
