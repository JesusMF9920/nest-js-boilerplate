import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Module({})
export class LoggerSwitcher {
  static init({ disable }: { disable: boolean }): DynamicModule {
    if (disable) {
      return {
        module: LoggerSwitcher,
      };
    }

    return {
      module: LoggerSwitcher,
      imports: [
        LoggerModule.forRoot({
          exclude: ['/healthz'],
        }),
      ],
    };
  }
}
