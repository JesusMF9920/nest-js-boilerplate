import { DynamicModule, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroORMConfig from '../mikro-orm.config';

@Module({})
export class MikroOrmSwitcherModule {
  static init({ disable }: { disable: boolean }): DynamicModule {
    if (disable) {
      return {
        module: MikroOrmSwitcherModule,
      };
    }

    return {
      module: MikroOrmSwitcherModule,
      imports: [MikroOrmModule.forRoot(mikroORMConfig)],
    };
  }
}
