import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { config } from './config';
import { HttpExceptionFilterLogger } from './task/shared/infraestructure/error-handling/boilerplate/HttpExceptionFilterLogger';
import { GlobalErrorsInterceptor } from './task/shared/infraestructure/error-handling/boilerplate/GlobalErrorsInterceptor';
import { DomainToInfrastructureMapper } from './task/shared/infraestructure/error-handling/DomainToInfrastructureMap';
import { LoggerSwitcher } from './utils/logger-switcher';
import { MikroOrmSwitcherModule } from './utils/MikroOrmSwitcher.module';
import { MetaController } from './api/v1/meta/MetaController';
import { AccountsModule } from './task/accounts/accounts.module';

@Module({
  imports: [
    LoggerSwitcher.init({ disable: config.testModeEnabled }),
    MikroOrmSwitcherModule.init({
      disable: config.testModeEnabled && !config.forceEnableMikroORMRepositories,
    }),
    AccountsModule,
  ],
  controllers: [MetaController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalErrorsInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilterLogger,
    },
    DomainToInfrastructureMapper,
  ],
})
export class AppModule {}
